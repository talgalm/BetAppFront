import * as z from 'zod';
import type { TFunction } from 'i18next';

// Reusable strict trimmed string schema
const strictString = (errorMsg: string, minLen = 1, maxLen?: number) =>
  z
    .string()
    .transform((val) => val.trim())
    .refine((val) => val.length >= minLen, { message: errorMsg })
    .refine((val) => (maxLen ? val.length <= maxLen : true), { message: errorMsg })
    .refine((val) => /^[^\s]+(\s+[^\s]+)*$/.test(val), {
      message: errorMsg,
    });
// This regex: prevents multiple consecutive spaces, leading/trailing spaces already trimmed, avoids just spaces.

export const createBetSchema = (t: TFunction) =>
  z
    .object({
      name: strictString(t('Schemas.Bet.NameRequired'), 1, 100),
      description: z
        .string()
        .max(500, t('Schemas.Bet.DescriptionTooLong'))
        .transform((val) => val.trim())
        .optional(),
      betim: z
        .number()
        .min(0, t('Schemas.Bet.BetimPositive'))
        .max(100000, t('Schemas.Bet.BetimMax')),
      deadline: z.date().optional(),
      participents: z
        .array(
          z.object({
            phoneNumber: z
              .string()
              .transform((val) => val.replace(/\s+/g, ''))
              .refine((val) => /^\d{10,15}$/.test(val), {
                message: t('Schemas.Bet.PhoneInvalid'),
              })
              .optional(),
            fullName: strictString(t('Schemas.Bet.FullNameRequired'), 1, 100).optional(),
            id: z.string().uuid(t('Schemas.Bet.IdInvalid')).optional(),
            status: z.enum(['active', 'inactive']).optional(),
          })
        )
        .min(1, t('Schemas.Bet.AtLeastOneParticipant')),
      files: z.array(z.instanceof(File)).optional(),
      supervisor: z
        .array(
          z.object({
            id: z.string().uuid(t('Schemas.Bet.IdInvalid')),
          })
        )
        .optional(),
    })
    .refine(
      (data) => {
        // Custom logic: if exactly 1 participant - throw custom error
        if (data.participents.length === 1) {
          return false;
        }
        return true;
      },
      {
        message: t('Schemas.Bet.AtLeastTwoParticipants'), // Add this to your translations
        path: ['participents'], // Mark the error on the 'participents' field
      }
    );
