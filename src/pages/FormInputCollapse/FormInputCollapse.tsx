import { InputDiv, InputHeadline } from "./FormInputCollapse.styles";
import { Typography } from "../../components/Topography/topography";
import { TypographyTypes } from "../../Theme/Typography/typography";
import Collapse from "@mui/material/Collapse";
import { InputTypesCollapse } from "../FormInputCollapse/InputTypes";
import { TEXT_ICON_COLOR, TEXT_THIRD_COLOR } from "../../Theme/ColorTheme";
import InputByType from "../../components/Inputs";
import { useRef, useEffect } from "react";

interface FormInputCollapseProps {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  type: InputTypesCollapse;
  isOpen: boolean;
  control: any;
  inputName: string;
  onToggle: () => void;
}

const FormInputCollapse: React.FC<FormInputCollapseProps> = ({
  title,
  icon: Icon,
  type,
  isOpen,
  control,
  inputName,
  onToggle,
}) => {
  return (
    <InputDiv>
      <InputHeadline onClick={onToggle}>
        <Typography
          value={title}
          variant={TypographyTypes.H3}
          styleProps={isOpen ? { color: TEXT_THIRD_COLOR } : {}}
        />
        <Icon style={{ color: isOpen ? TEXT_THIRD_COLOR : TEXT_ICON_COLOR }} />
      </InputHeadline>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <InputByType type={type} control={control} inputName={inputName} />
      </Collapse>
    </InputDiv>
  );
};

export default FormInputCollapse;
