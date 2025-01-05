import { useState } from "react";
import { BetNameInput, PageContainer, StyledButton } from "./NewBet.styles";
import { TypographyTypes } from "../../Theme/Typography/typography";
import { Typography } from "../../components/Topography/topography";
import FormInputCollapse from "../FormInputCollapse/FormInputCollapse";
import { ReactComponent as EditDark } from "../../Theme/Icons/EditDark.svg";
import { ReactComponent as AddUser } from "../../Theme/Icons/AddUserIcon.svg";
import { ReactComponent as AddPen } from "../../Theme/Icons/AddPenIcon.svg";
import { ReactComponent as CalenderIcon } from "../../Theme/Icons/CalendarIcon.svg";
import { ReactComponent as FilesIcon } from "../../Theme/Icons/DocumentUploadIcon.svg";
import { ReactComponent as SupervisorIcon } from "../../Theme/Icons/OctagonUserIcon.svg";
import { InputTypesCollapse } from "../FormInputCollapse/InputTypes";
import { TEXT_SEC_COLOR } from "../../Theme/ColorTheme";
import { ReactComponent as AddIcon } from "../../Theme/Icons/AddIcon.svg";

const NewBet = () => {
  return (
    <PageContainer>
      <form onSubmit={() => {}}>
        <BetNameInput
          placeholder="הקלד כאן שם התערבות..."
          typography={TypographyTypes.H2}
        />
        <FormInputCollapse
          title="תיאור"
          icon={EditDark}
          type={InputTypesCollapse.Text}
        />
        <FormInputCollapse
          title="משתתפים"
          icon={AddUser}
          type={InputTypesCollapse.AddParticipants}
        />
        <FormInputCollapse
          title="תנאים"
          icon={AddPen}
          type={InputTypesCollapse.AddConditions}
        />
        <FormInputCollapse
          title="תאריך"
          icon={CalenderIcon}
          type={InputTypesCollapse.Calender}
        />
        <FormInputCollapse
          title="קבצים"
          icon={FilesIcon}
          type={InputTypesCollapse.Files}
        />
        <FormInputCollapse
          title="מפקח התערבות"
          icon={SupervisorIcon}
          type={InputTypesCollapse.AddParticipants}
        />
      </form>
      <StyledButton>
        <Typography
          value={"צור התערבות"}
          variant={TypographyTypes.H5}
          update={{ color: TEXT_SEC_COLOR }}
        />
        <AddIcon color={TEXT_SEC_COLOR} />
      </StyledButton>
    </PageContainer>
  );
};

export default NewBet;
