import * as z from 'zod';
import { TFunction } from 'i18next';

export const getNewPasswordSchema = (t: TFunction) =>
  z
    .object({
      Password: z
        .string({ required_error: t('Register.Validation.Required') })
        .min(6, t('Register.Validation.PasswordTooShort')),
      PasswordVerification: z
        .string({ required_error: t('Register.Validation.Required') })
        .min(6, t('Register.Validation.PasswordVerificationTooShort')),
    })
    .refine((data) => data.Password === data.PasswordVerification, {
      message: t('Register.Validation.PasswordsDontMatch'),
      path: ['PasswordVerification'],
    });
