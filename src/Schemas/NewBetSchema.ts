import * as z from 'zod';
import type { TFunction } from 'i18next';

export const createBetSchema = (t: TFunction) =>
  z.object({
    name: z.string().min(1, t('Bet.Validation.NameRequired')),
    description: z.string().optional(),
    betim: z.number().min(0, t('Bet.Validation.BetimPositive')),
    deadline: z.date().optional(),
    participents: z
      .array(
        z.object({
          phoneNumber: z.string().min(10, t('Bet.Validation.PhoneInvalid')),
          fullName: z.string().min(1, t('Bet.Validation.FullNameRequired')),
          id: z.string().optional(),
          status: z.enum(['active', 'inactive']).optional(),
        })
      )
      .optional(),
    files: z.array(z.instanceof(File)).optional(),
    supervisor: z.array(z.object({ id: z.string() })).optional(),
  });
