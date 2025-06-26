import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import { UserActiveStep } from '@store/authStepAtom';

import Register from './Register';
import { getRegisterStepSchemas } from '../../../Schemas/RegisterSchema';
import { RegisterFormInput } from '@interfaces/Auth.interface';

const RegisterForm = (): JSX.Element => {
  const { t } = useTranslation();
  const [step] = useAtom(UserActiveStep);

  const stepSchemas = getRegisterStepSchemas(t);
  const schema = stepSchemas[step.step as keyof typeof stepSchemas];

  const methods = useForm<RegisterFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      fullName: '',
      phoneNumber: '',
      password: '',
      passwordVerification: '',
    },
  });

  return (
    <FormProvider {...methods}>
      <Register />
    </FormProvider>
  );
};

export default RegisterForm;
