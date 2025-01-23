import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import NewBet from "./NewBet";

const NewBetForm: React.FC = () => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <NewBet />
    </FormProvider>
  );
};

export default NewBetForm;
