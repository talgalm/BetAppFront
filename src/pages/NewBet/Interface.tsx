import { InputTypesCollapse } from "../FormInputCollapse/InputTypes";
import { ReactComponent as EditDark } from "../../Theme/Icons/EditDark.svg";
import { ReactComponent as AddUser } from "../../Theme/Icons/AddUserIcon.svg";
import { ReactComponent as AddPen } from "../../Theme/Icons/AddPenIcon.svg";
import { ReactComponent as CalenderIcon } from "../../Theme/Icons/CalendarIcon.svg";
import { ReactComponent as FilesIcon } from "../../Theme/Icons/DocumentUploadIcon.svg";
import { ReactComponent as SupervisorIcon } from "../../Theme/Icons/OctagonUserIcon.svg";

export enum CollapseTitles {
  DESCRIPTION = "Description",
  PARTICIPANTS = "Participants",
  CONDITIONS = "Conditions",
  DATE = "Date",
  FILES = "Files",
  SUPERVISOR = "Supervisor",
}

export const newBetsFieldsData = [
  {
    title: CollapseTitles.DESCRIPTION,
    label: "NewBet.DescriptionTitle",
    icon: EditDark,
    type: InputTypesCollapse.Text,
    inputName: "Description",
  },
  {
    title: CollapseTitles.PARTICIPANTS,
    label: "NewBet.ParticipantsTitle",
    icon: AddUser,
    type: InputTypesCollapse.AddParticipants,
    inputName: "Participants",
  },
  {
    title: CollapseTitles.CONDITIONS,
    label: "NewBet.ConditionsTitle",
    icon: AddPen,
    type: InputTypesCollapse.AddConditions,
    inputName: "Conditions",
  },
  {
    title: CollapseTitles.DATE,
    label: "NewBet.DateTitle",
    icon: CalenderIcon,
    type: InputTypesCollapse.Calender,
    inputName: "EndsIn",
  },
  {
    title: CollapseTitles.FILES,
    label: "NewBet.FilesTitle",
    icon: FilesIcon,
    type: InputTypesCollapse.Files,
    inputName: "Files",
  },
  {
    title: CollapseTitles.SUPERVISOR,
    label: "NewBet.SupervisorTitle",
    icon: SupervisorIcon,
    type: InputTypesCollapse.AddParticipants,
    inputName: "Supervisor",
  },
];
