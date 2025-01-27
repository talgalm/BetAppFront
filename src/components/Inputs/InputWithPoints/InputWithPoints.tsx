import { TypographyTypes } from "../../../Theme/Typography/typography";
import { Typography } from "../../Topography/topography";
import { ReactComponent as AddIcon } from "../../../Theme/Icons/AddGray.svg";
import { User } from "../../../api/interfaces";
import {
  AddConditionsDiv,
  AddParticipantTag,
  CollapseInnerDiv,
  CollapseOuterDiv,
  StyledCancelIcon,
} from "./InputWithPoints.styles";
import { useTranslation } from "react-i18next";
import FileUploader from "../../FileUploader/FileUploader";
import { useEffect, useState } from "react";
import { Collapse } from "@mui/material";
import InputTextFull from "../InputTextFull/InputTextFull";
import { ReactComponent as MinusIcon } from "../../../Theme/Icons/Minus.svg";
import { ReactComponent as CancelIcon } from "../../../Theme/Icons/Close.svg";
import { TEXT_THIRD_COLOR } from "../../../Theme/ColorTheme";
import { useFormContext } from "react-hook-form";

export enum InputWithPointsType {
  FILES,
  CONDITIONS,
}

interface InputWithPointsProps {
  type: InputWithPointsType;
  control: any;
  inputName: string;
}

const InputWithPoints: React.FC<InputWithPointsProps> = ({
  type,
  control,
  inputName,
}) => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { setValue } = useFormContext();

  const handleToggle = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const handleCleanInput = (index: number) => {
    setValue(`Conditions.${index}.text`, "");
  };

  const users: User[] = [
    {
      username: "TalG",
      fullName: "טל גלמור",
      image: undefined,
    },
    {
      username: "Vlad",
      image: undefined,
    },
  ];

  return (
    <AddConditionsDiv>
      {type === InputWithPointsType.CONDITIONS &&
        users.map((user, index) => (
          <CollapseOuterDiv>
            <AddParticipantTag
              key={user.username}
              onClick={() => handleToggle(index)}
            >
              {openIndex !== index ? <AddIcon /> : <MinusIcon />}
              <Typography
                value={user.fullName || user.username}
                variant={TypographyTypes.H4}
              />
            </AddParticipantTag>
            <Collapse in={openIndex === index} timeout="auto" unmountOnExit>
              <CollapseInnerDiv>
                <StyledCancelIcon onClick={() => handleCleanInput(index)} />
                <InputTextFull
                  control={control}
                  inputName={`Conditions.${index}.text` as const}
                  isSetHeight={true}
                />
              </CollapseInnerDiv>
            </Collapse>
          </CollapseOuterDiv>
        ))}

      {type === InputWithPointsType.FILES && (
        <FileUploader inputName={inputName} />
      )}
    </AddConditionsDiv>
  );
};

export default InputWithPoints;
