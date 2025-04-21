import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslation } from 'react-i18next';
import ForgotPassword from './ForgotPassword';
import { ForgotPasswordFormInput } from '../Login/interface';

const ForgotPasswordForm = (): JSX.Element => {
  const { t } = useTranslation();

  const schema = z.object({
    Email: z
      .string({ required_error: t('Register.Validation.Required') })
      .email(t('Register.Validation.EmailInvalid')),
  });

  const methods = useForm<ForgotPasswordFormInput>({
    defaultValues: {
      Email: '',
    },
    resolver: zodResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <ForgotPassword />
    </FormProvider>
  );
};

export default ForgotPasswordForm;
