import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { BetNameInput, PageContainer, StyledButton } from "./NewBet.styles";
import { Typography } from "../../components/Topography/topography";
import FormInputCollapse from "../FormInputCollapse/FormInputCollapse";
import { ReactComponent as AddIcon } from "../../Theme/Icons/AddIcon.svg";
import SuccessfullNewBet from "../SuccessfullNewBet/SuccessfullNewBet";
import BetLoader from "../../Theme/Loader/loader";
import { TypographyTypes } from "../../Theme/Typography/typography";
import { TEXT_SEC_COLOR } from "../../Theme/ColorTheme";
import { newBetsFieldsData, CollapseTitles } from "./Interface";
import { SubmitHandler, useForm, Controller } from "react-hook-form";

const NewBet = () => {
  const [isSuccessfull, setIsSuccessfull] = useState(false);
  const [currentOpen, setCurrentOpen] = useState<CollapseTitles | null>(null);
  const { t } = useTranslation();

  type CreateFormInputs = {
    Name: string;
    Description: string;
    Conditions: any[];
    EndsIn: Date;
    Files: File[];
    Supervisor: string[];
  };
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormInputs>();

  if (false) {
    return <BetLoader />;
  }

  const handleCollapseToggle = (title: CollapseTitles) => {
    setCurrentOpen((prev) => (prev === title ? null : title));
  };

  const onSubmit: SubmitHandler<CreateFormInputs> = (data) => {
    console.log(data);
    setIsSuccessfull(true);
  };

  return (
    <PageContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <BetNameInput
          {...register("Name")}
          placeholder={t("NewBet.BetNameInput")}
          typography={TypographyTypes.H2}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              setCurrentOpen(CollapseTitles.DESCRIPTION);
            }
          }}
        />
        {newBetsFieldsData.map(({ title, label, icon, type, inputName }) => (
          <FormInputCollapse
            key={title}
            title={t(label)}
            icon={icon}
            type={type}
            isOpen={currentOpen === title}
            onToggle={() => handleCollapseToggle(title)}
            inputName={inputName}
            control={control}
          />
        ))}
      </form>
      <StyledButton onClick={handleSubmit(onSubmit)}>
        <Typography
          value={t("NewBet.createBet")}
          variant={TypographyTypes.H5}
          styleProps={{ color: TEXT_SEC_COLOR }}
        />
        <AddIcon color={TEXT_SEC_COLOR} />
      </StyledButton>
      {isSuccessfull && <SuccessfullNewBet />}
    </PageContainer>
  );
};

export default NewBet;
