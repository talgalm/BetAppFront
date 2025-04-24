import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslation } from 'react-i18next';
import Login from './Login';
import { LoginFormInput } from './interface';

const LoginForm = (): JSX.Element => {
  const { t } = useTranslation();

  const schema = z.object({
    email: z
      .string({ required_error: t('Register.Validation.Required') })
      .email(t('Register.Validation.EmailInvalid')),
  });

  const methods = useForm<LoginFormInput>({
    defaultValues: {
      password: '',
      email: '',
    },
    resolver: zodResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <Login />
    </FormProvider>
  );
};

export default LoginForm;
