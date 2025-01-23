import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import NewBet from "./NewBet";
import { CreateFormInputs } from "./Interface";

const NewBetForm: React.FC = () => {
  const methods = useForm<CreateFormInputs>();

  return (
    <FormProvider {...methods}>
      <NewBet />
    </FormProvider>
  );
};

export default NewBetForm;
