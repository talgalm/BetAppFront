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
import SuccessfullNewBet from "../SuccessfullNewBet/SuccessfullNewBet";
import BetLoader from "../../Theme/Loader/loader";
import { useTranslation } from "react-i18next";

enum CollapseTitles {
  DESCRIPTION = "DESCRIPTION",
  PARTICIPANTS = "PARTICIPANTS",
  CONDITIONS = "CONDITIONS",
  DATE = "DATE",
  FILES = "FILES",
  SUPERVISOR = "SUPERVISOR",
}

const NewBet = () => {
  const [Successfull, setSuccessfull] = useState(false);
  const [currentOpen, setCurrentOpen] = useState<CollapseTitles | null>(null);
  const { t } = useTranslation();

  if (false) {
    return <BetLoader />;
  }

  const handleBetNameInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setCurrentOpen(CollapseTitles.DESCRIPTION);
    }
  };

  const handleCollapseToggle = (title: CollapseTitles) => {
    setCurrentOpen((prev) => (prev === title ? null : title));
  };

  return (
    <PageContainer>
      <form onSubmit={() => {}}>
        <BetNameInput
          placeholder={t("NewBet.BetNameInput")}
          typography={TypographyTypes.H2}
          onKeyDown={handleBetNameInputKeyDown}
        />
        <FormInputCollapse
          title={t("NewBet.DescriptionTitle")}
          icon={EditDark}
          type={InputTypesCollapse.Text}
          isOpen={currentOpen === CollapseTitles.DESCRIPTION}
          onToggle={() => handleCollapseToggle(CollapseTitles.DESCRIPTION)}
        />
        <FormInputCollapse
          title={t("NewBet.ParticipantsTitle")}
          icon={AddUser}
          type={InputTypesCollapse.AddParticipants}
          isOpen={currentOpen === CollapseTitles.PARTICIPANTS}
          onToggle={() => handleCollapseToggle(CollapseTitles.PARTICIPANTS)}
        />
        <FormInputCollapse
          title={t("NewBet.ConditionsTitle")}
          icon={AddPen}
          type={InputTypesCollapse.AddConditions}
          isOpen={currentOpen === CollapseTitles.CONDITIONS}
          onToggle={() => handleCollapseToggle(CollapseTitles.CONDITIONS)}
        />
        <FormInputCollapse
          title={t("NewBet.DateTitle")}
          icon={CalenderIcon}
          type={InputTypesCollapse.Calender}
          isOpen={currentOpen === CollapseTitles.DATE}
          onToggle={() => handleCollapseToggle(CollapseTitles.DATE)}
        />
        <FormInputCollapse
          title={t("NewBet.FilesTitle")}
          icon={FilesIcon}
          type={InputTypesCollapse.Files}
          isOpen={currentOpen === CollapseTitles.FILES}
          onToggle={() => handleCollapseToggle(CollapseTitles.FILES)}
        />
        <FormInputCollapse
          title={t("NewBet.SupervisorTitle")}
          icon={SupervisorIcon}
          type={InputTypesCollapse.AddParticipants}
          isOpen={currentOpen === CollapseTitles.SUPERVISOR}
          onToggle={() => handleCollapseToggle(CollapseTitles.SUPERVISOR)}
        />
      </form>
      <StyledButton onClick={() => setSuccessfull(true)}>
        <Typography
          value={t("NewBet.createBet")}
          variant={TypographyTypes.H5}
          styleProps={{ color: TEXT_SEC_COLOR }}
        />
        <AddIcon color={TEXT_SEC_COLOR} />
      </StyledButton>
      {Successfull && <SuccessfullNewBet />}
    </PageContainer>
  );
};

export default NewBet;
