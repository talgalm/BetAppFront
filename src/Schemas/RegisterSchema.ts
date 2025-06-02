import * as z from 'zod';
import { TFunction } from 'i18next';
import { AuthStepValueTypes } from '../pages/Auth/WelcomePage/interface';

export const getRegisterStepSchemas = (t: TFunction) => ({
  [AuthStepValueTypes.RegisterInfo]: z.object({
    email: z
      .string({ required_error: t('Register.Validation.Required') })
      .email(t('Register.Validation.EmailInvalid')),
    fullName: z
      .string({ required_error: t('Register.Validation.Required') })
      .min(1, t('Register.Validation.FullNameRequired')),
    phoneNumber: z
      .string({ required_error: t('Register.Validation.Required') })
      .min(10, t('Register.Validation.PhoneInvalid')),
  }),

  [AuthStepValueTypes.RegisterPassword]: z
    .object({
      password: z
        .string({ required_error: t('Register.Validation.Required') })
        .min(6, t('Register.Validation.PasswordTooShort')),
      passwordVerification: z
        .string({ required_error: t('Register.Validation.Required') })
        .min(6, t('Register.Validation.PasswordVerificationTooShort')),
    })
    .refine((data) => data.password === data.passwordVerification, {
      message: t('Register.Validation.PasswordsDontMatch'),
      path: ['passwordVerification'],
    }),
});
