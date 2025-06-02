// schemas/loginSchema.ts
import * as z from 'zod';
import { TFunction } from 'i18next';

export const getLoginSchema = (t: TFunction) =>
  z.object({
    email: z
      .string({ required_error: t('Register.Validation.Required') })
      .email(t('Register.Validation.EmailInvalid')),
    password: z.string({ required_error: t('Register.Validation.Required') }),
  });

export type LoginFormInput = z.infer<ReturnType<typeof getLoginSchema>>;
