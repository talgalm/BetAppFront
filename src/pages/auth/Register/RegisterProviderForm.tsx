import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import RegisterProvider from './RegisterProvider';
import { getRegisterProviderSchema } from '@schemas/RegisterProviderSchema';

export type RegisterProviderFormInput = {
  PhoneNumber: string;
};

const RegisterProviderForm = (): JSX.Element => {
  const { t } = useTranslation();

  const schema = getRegisterProviderSchema(t);

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
