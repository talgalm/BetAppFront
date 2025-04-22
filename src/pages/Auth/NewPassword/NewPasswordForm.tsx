import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslation } from 'react-i18next';
import { NewPasswordFormInput } from '../Login/interface';
import NewPassword from './NewPassword';

const NewPasswordForm = (): JSX.Element => {
  const { t } = useTranslation();

  const schema = z
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

  const methods = useForm<NewPasswordFormInput>({
    defaultValues: {
      Password: '',
      PasswordVerification: '',
    },
    resolver: zodResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <NewPassword />
    </FormProvider>
  );
};

export default NewPasswordForm;
