import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import NewBet from './NewBet';
import { CreateBetInputs } from './Interface';
import { useQueryClient } from '@tanstack/react-query';
import { User } from '../../Interfaces';

const NewBetForm: React.FC = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(['user-profile']);
  const methods = useForm<CreateBetInputs>({
    defaultValues: {
      participents: [
        {
          phoneNumber: user?.phoneNumber ?? '',
          fullName: user?.fullName ?? '',
          id: user?.id ?? '',
          approved: 'active',
        },
      ],
    },
  });

  return (
    <FormProvider {...methods}>
      <NewBet />
    </FormProvider>
  );
};

export default NewBetForm;
