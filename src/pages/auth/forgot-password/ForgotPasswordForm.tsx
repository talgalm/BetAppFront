import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import ForgotPassword from './ForgotPassword';
import { ForgotPasswordFormInput } from '@interfaces/Auth.interface';
import { getForgotPasswordSchema } from '@schemas/ForgotPasswordSchema';

const ForgotPasswordForm = (): JSX.Element => {
  const { t } = useTranslation();

  const schema = getForgotPasswordSchema(t);

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
