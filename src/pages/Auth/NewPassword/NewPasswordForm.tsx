import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { NewPasswordFormInput } from '../../../interfaces/Auth.interface';
import NewPassword from './NewPassword';
import { getNewPasswordSchema } from '../../../Schemas/NewPasswordSchema';

const NewPasswordForm = (): JSX.Element => {
  const { t } = useTranslation();
  const schema = getNewPasswordSchema(t);

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
