import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import NewBet from './NewBet';
import { CreateFormInputs } from './Interface';

const NewBetForm: React.FC = () => {
  const methods = useForm<CreateFormInputs>({
    defaultValues: {
      Name: '',
      Description: '',
      Conditions: [],
      EndsIn: new Date(),
      AddTocalendar: true,
      Files: [],
      Supervisor: [],
    },
  });

  return (
    <FormProvider {...methods}>
      <NewBet />
    </FormProvider>
  );
};

export default NewBetForm;
