import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import NewBet from './NewBet';
import { CreateBetInputs } from './Interface';
import { useAtom } from 'jotai';
import { userAtom } from '../../Jotai/atoms';

const NewBetForm: React.FC = () => {
  const [user] = useAtom(userAtom);
  const methods = useForm<CreateBetInputs>({
    defaultValues: {
      participents: [
        {
          phoneNumber: user?.phoneNumber ?? '',
          fullName: user?.fullName ?? '',
          id: user?.id ?? '',
          approved: true,
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
