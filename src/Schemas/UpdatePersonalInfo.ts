// schemas/loginSchema.ts
import * as z from 'zod';
import { TFunction } from 'i18next';

export const getUpdatePersonalInfoSchema = (t: TFunction) =>
  z.object({
    email: z
      .string({ required_error: t('Register.Validation.Required') })
      .email(t('Register.Validation.EmailInvalid')),
    fullName: z
      .string({ required_error: t('Register.Validation.Required') })
      .min(2, t('Register.Validation.FullNameTooShort')),
    phoneNumber: z
      .string({ required_error: t('Register.Validation.Required') })
      .regex(
        /^(\+?\d{1,3})?[-.\s]?\(?\d{2,4}\)?[-.\s]?\d{3}[-.\s]?\d{3,4}$/,
        t('Register.Validation.PhoneInvalid')
      ),
  });

export type PersonalInfoFormInput = z.infer<ReturnType<typeof getUpdatePersonalInfoSchema>>;
