import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import NewBet from './NewBet';
import { CreateFormInputs } from './Interface';
import { NewBetSchema } from '../../Schemas/NewBetSchema';

const NewBetForm: React.FC = () => {
  const methods = useForm<CreateFormInputs>({
    resolver: zodResolver(NewBetSchema),
    defaultValues: {
      Name: '',
      Description: '',
      Participants: [],
      Conditions: [],
      EndsIn: null,
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
