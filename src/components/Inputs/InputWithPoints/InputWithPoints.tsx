import { TypographyTypes } from "../../../Theme/Typography/typography";
import Circle from "../../Circle/CircleComponent";
import { Typography } from "../../Topography/topography";

import { ReactComponent as AddIcon } from "../../../Theme/Icons/AddGray.svg";
import { TEXT_ICON_COLOR_SEC } from "../../../Theme/ColorTheme";
import { User } from "../../../api/interfaces";
import { AddConditionsDiv, AddParticipantTag } from "./InputWithPoints.styles";
import { useTranslation } from "react-i18next";

export enum InputWithPointsType {
  FILES,
  CONDITIONS,
}
interface InputWithPointsProps {
  type: InputWithPointsType;
}

const InputWithPoints: React.FC<InputWithPointsProps> = ({ type }) => {
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
          <AddParticipantTag>
            <AddIcon />
            <Typography
              value={user.fullName || user.username}
              variant={TypographyTypes.H4}
            />
          </AddParticipantTag>
        ))}
      {type === InputWithPointsType.FILES && (
        <AddConditionsDiv>
          <AddParticipantTag>
            <AddIcon />
            <Typography
              value={t("Input.TextPoints.AddFile")}
              variant={TypographyTypes.H4}
            />
          </AddParticipantTag>
        </AddConditionsDiv>
      )}
    </AddConditionsDiv>
  );
};
export default InputWithPoints;
