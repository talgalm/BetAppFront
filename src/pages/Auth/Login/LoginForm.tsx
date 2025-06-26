// LoginForm.tsx
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import Login from './Login';
import { getLoginSchema, LoginFormInput } from '@schemas/LoginSchema';

const LoginForm = () => {
  const { t } = useTranslation();

  const schema = getLoginSchema(t);

  const methods = useForm<LoginFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <FormProvider {...methods}>
      <Login />
    </FormProvider>
  );
};

export default LoginForm;
