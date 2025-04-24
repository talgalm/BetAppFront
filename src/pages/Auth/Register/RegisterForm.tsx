import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslation } from 'react-i18next';
import Register from './Register';
import { AuthStepValueTypes } from '../WelcomePage/interface';
import { useAtom } from 'jotai';
import { UserActiveStep } from '../../../Jotai/UserAtoms';

export type RegisterFormInput = {
  email: string;
  fullName: string;
  phoneNumber: string;
  password: string;
  passwordVerification: string;
};

const RegisterForm = (): JSX.Element => {
  const { t } = useTranslation();
  const [step] = useAtom(UserActiveStep);

  const stepSchemas = {
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
        path: ['PasswordVerification'],
      }),
  };

  const schema = stepSchemas[step.step as keyof typeof stepSchemas];

  const methods = useForm<RegisterFormInput>({
    defaultValues: {
      email: '',
      fullName: '',
      phoneNumber: '',
      password: '',
      passwordVerification: '',
    },
    resolver: zodResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <Register />
    </FormProvider>
  );
};

export default RegisterForm;
