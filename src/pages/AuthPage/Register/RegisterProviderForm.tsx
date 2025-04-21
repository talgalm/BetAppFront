import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslation } from 'react-i18next';
import RegisterProvider from './RegisterProvider';

export type RegisterProviderFormInput = {
  PhoneNumber: string;
};

const RegisterProviderForm = (): JSX.Element => {
  const { t } = useTranslation();

  const schema = z.object({
    PhoneNumber: z
      .string({ required_error: t('Register.Validation.Required') })
      .min(10, t('Register.Validation.PhoneInvalid')),
  });

  const methods = useForm<RegisterProviderFormInput>({
    defaultValues: {
      PhoneNumber: '',
    },
    resolver: zodResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <RegisterProvider />
    </FormProvider>
  );
};

export default RegisterProviderForm;
