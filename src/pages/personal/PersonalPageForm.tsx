import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import Personal from './PersonalPage';
import { getUpdatePersonalInfoSchema, PersonalInfoFormInput } from '@schemas/UpdatePersonalInfo';
import { useProfile } from '@providers/useProfile';

const PersonalForm = () => {
  const { data: profile } = useProfile();

  const { t } = useTranslation();

  const schema = getUpdatePersonalInfoSchema(t);

  const methods = useForm<PersonalInfoFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: profile?.fullName,
      email: profile?.email,
      phoneNumber: profile?.phoneNumber,
    },
  });

  return (
    <FormProvider {...methods}>
      <Personal />
    </FormProvider>
  );
};

export default PersonalForm;
