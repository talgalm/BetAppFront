import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import NewBet from './NewBet';
import { CreateBetInputs } from './Interface';

const NewBetForm: React.FC = () => {
  const methods = useForm<CreateBetInputs>({
    defaultValues: {
      name: '',
    },
  });

  return (
    <FormProvider {...methods}>
      <NewBet />
    </FormProvider>
  );
};

export default NewBetForm;
