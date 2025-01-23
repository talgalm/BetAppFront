import { TypographyTypes } from "../../../Theme/Typography/typography";
import { Typography } from "../../Topography/topography";
import { ReactComponent as AddIcon } from "../../../Theme/Icons/AddGray.svg";
import { User } from "../../../api/interfaces";
import { AddConditionsDiv, AddParticipantTag } from "./InputWithPoints.styles";
import { useTranslation } from "react-i18next";
import FileUploader from "../../FileUploader/FileUploader";

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
    {
      username: "Vlad",
      image: undefined,
    },
  ];

  return (
    <AddConditionsDiv>
      {type === InputWithPointsType.CONDITIONS &&
        users.map((user) => (
          <AddParticipantTag key={user.username}>
            <AddIcon />
            <Typography
              value={user.fullName || user.username}
              variant={TypographyTypes.H4}
            />
          </AddParticipantTag>
        ))}

      {type === InputWithPointsType.FILES && (
        <FileUploader control={control} inputName={inputName} />
      )}
    </AddConditionsDiv>
  );
};

export default InputWithPoints;
