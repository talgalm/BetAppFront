import * as z from 'zod';
import { TFunction } from 'i18next';

export const getRegisterProviderSchema = (t: TFunction) =>
  z.object({
    PhoneNumber: z
      .string({ required_error: t('Register.Validation.Required') })
      .min(10, t('Register.Validation.PhoneInvalid')),
  });
