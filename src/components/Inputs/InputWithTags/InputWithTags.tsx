import { TypographyTypes } from "../../../Theme/Typography/typography";
import Circle from "../../Circle/CircleComponent";
import { Typography } from "../../Topography/topography";
import { AddParticipantsDiv, AddParticipantTag, ParticipantTag } from "./InputWithTags.styles";
import { ReactComponent as AddIcon } from "../../../Theme/Icons/AddGray.svg";
import { TEXT_ICON_COLOR_SEC } from "../../../Theme/ColorTheme";
import { User } from "../../../api/interfaces";


const InputWithTags = () => {
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
      <AddParticipantsDiv>
        {users.map((user, index) => (
          <ParticipantTag key={user.username}>
            <Circle key={index} index={index} participantsNumber={1} />
            <Typography
              value={user.fullName || user.username}
              variant={TypographyTypes.H4}
            />
          </ParticipantTag>
        ))}
        <AddParticipantTag>
          <AddIcon style={{ color: TEXT_ICON_COLOR_SEC }} />
          <Typography
            value={"הוסף"}
            variant={TypographyTypes.H4}
            update={{ color: TEXT_ICON_COLOR_SEC }}
          />
        </AddParticipantTag>
      </AddParticipantsDiv>
    );
}
export default InputWithTags;