import * as z from 'zod';
import { TFunction } from 'i18next';

export const getForgotPasswordSchema = (t: TFunction) =>
  z.object({
    Email: z
      .string({ required_error: t('Register.Validation.Required') })
      .email(t('Register.Validation.EmailInvalid')),
  });
