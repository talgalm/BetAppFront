import { TypographyTypes } from "../../../Theme/Typography/typography";
import { Typography } from "../../Topography/topography";
import { ReactComponent as AddIcon } from "../../../Theme/Icons/AddGray.svg";
import { User } from "../../../api/interfaces";
import {
  AddConditionsDiv,
  AddParticipantTag,
  CollapseInnerDiv,
  CollapseOuterDiv,
} from "./InputWithPoints.styles";
import { useTranslation } from "react-i18next";
import FileUploader from "../../FileUploader/FileUploader";
import { useState } from "react";
import { Collapse } from "@mui/material";
import InputTextFull from "../InputTextFull/InputTextFull";
import { ReactComponent as MinusIcon } from "../../../Theme/Icons/Minus.svg";
import { ReactComponent as CancelIcon } from "../../../Theme/Icons/Close.svg";
import { TEXT_THIRD_COLOR } from "../../../Theme/ColorTheme";

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
  const handleToggle = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
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
                <CancelIcon
                  width={24}
                  height={24}
                  onClick={() => handleToggle(index)}
                  style={{
                    cursor: "pointer",
                    color: TEXT_THIRD_COLOR,
                    marginTop: "32px",
                  }}
                />
                <InputTextFull control={control} inputName={"Conditions"} />
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
