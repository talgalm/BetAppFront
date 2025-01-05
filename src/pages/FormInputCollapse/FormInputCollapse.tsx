import { useState } from "react";
import {
  AddConditionsDiv,
  AddParticipantsDiv,
  AddParticipantTag,
  BetInput,
  InputDiv,
  InputHeadline,
  NumOfChars,
  ParticipantTag,
} from "./FormInputCollapse.styles";
import { Typography } from "../../components/Topography/topography";
import { TypographyTypes } from "../../Theme/Typography/typography";
import Collapse from "@mui/material/Collapse";
import { InputTypesCollapse } from "../FormInputCollapse/InputTypes";
import {
  TEXT_ICON_COLOR,
  TEXT_ICON_COLOR_SEC,
  TEXT_THIRD_COLOR,
} from "../../Theme/ColorTheme";
import { User } from "../../api/interfaces";
import { ReactComponent as AddIcon } from "../../Theme/Icons/AddGray.svg";
import Circle from "../../components/Circle/CircleComponent";
import Calendar from "../../components/Calendar/Calendar";
import InputWithTags from "../../components/Inputs/InputWithTags/InputWithTags";
import InputWithPoints, {
  InputWithPointsType,
} from "../../components/Inputs/InputWithPoints/InputWithPoints";
import InputTextFull from "../../components/Inputs/InputTextFull/InputTextFull";

interface FormInputCollapseProps {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  type: InputTypesCollapse;
}

const FormInputCollapse: React.FC<FormInputCollapseProps> = ({
  title,
  icon: Icon,
  type,
}) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <InputDiv>
      <InputHeadline onClick={handleToggle}>
        <Typography
          value={title}
          variant={TypographyTypes.H3}
          update={open ? { color: TEXT_THIRD_COLOR } : undefined}
        />
        <Icon style={{ color: open ? TEXT_THIRD_COLOR : TEXT_ICON_COLOR }} />
      </InputHeadline>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <Typography
          value={
            "כאן יהיה טקסט תיאור עד 2 שורות אשר שמסביר במילים פשוטות מה עושים כאן"
          }
          variant={TypographyTypes.H6}
        />
        {type === InputTypesCollapse.Text && <InputTextFull />}
        {type === InputTypesCollapse.AddParticipants && <InputWithTags />}
        {type === InputTypesCollapse.AddConditions && (
          <InputWithPoints type={InputWithPointsType.CONDITIONS} />
        )}
        {type === InputTypesCollapse.Files && (
          <InputWithPoints type={InputWithPointsType.FILES} />
        )}
        {type === InputTypesCollapse.Calender && (
          <AddConditionsDiv>
            <Calendar />
          </AddConditionsDiv>
        )}
      </Collapse>
    </InputDiv>
  );
};

export default FormInputCollapse;
