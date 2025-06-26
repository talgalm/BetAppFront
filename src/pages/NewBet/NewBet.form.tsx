import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import NewBet from './NewBet';
import { CreateBetInputs } from './new-bet-steps';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { createBetSchema } from '../../Schemas/NewBetSchema';
import { User } from '@interfaces/User.interface';

const NewBetForm: React.FC = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(['user-profile']);

  const schema = createBetSchema(t);

  const methods = useForm<CreateBetInputs>({
    defaultValues: {
      participents: [
        {
          phoneNumber: user?.phoneNumber ?? '',
          fullName: user?.fullName ?? '',
          id: user?.id ?? '',
          status: 'active',
        },
      ],
    },
    resolver: zodResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <NewBet />
    </FormProvider>
  );
};

export default NewBetForm;
