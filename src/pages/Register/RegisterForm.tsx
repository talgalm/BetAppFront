import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslation } from 'react-i18next';
import Register from './Register';
import { AuthStepValueTypes } from '../WelcomePage/interface';
import { useAtom } from 'jotai';
import { UserActiveStep } from '../../Jotai/UserAtoms';

export type RegisterFormInput = {
  Email: string;
  FullName: string;
  PhoneNumber: string;
  Password: string;
  PasswordVerification: string;
};

const RegisterForm = (): JSX.Element => {
  const { t } = useTranslation();
  const [step] = useAtom(UserActiveStep);

  const stepSchemas = {
    [AuthStepValueTypes.RegisterInfo]: z.object({
      Email: z
        .string({ required_error: t('Register.Validation.Required') })
        .email(t('Register.Validation.EmailInvalid')),
      FullName: z
        .string({ required_error: t('Register.Validation.Required') })
        .min(1, t('Register.Validation.FullNameRequired')),
      PhoneNumber: z
        .string({ required_error: t('Register.Validation.Required') })
        .min(10, t('Register.Validation.PhoneInvalid')),
    }),
    [AuthStepValueTypes.RegisterPassword]: z
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
      }),
  };

  const schema = stepSchemas[step.step as keyof typeof stepSchemas];

  const methods = useForm<RegisterFormInput>({
    defaultValues: {
      Email: '',
      FullName: '',
      PhoneNumber: '',
      Password: '',
      PasswordVerification: '',
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
