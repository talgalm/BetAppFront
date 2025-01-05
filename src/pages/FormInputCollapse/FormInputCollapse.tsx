import { useState } from "react";
import StyledCalendar, {
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
import { ReactComponent as RightArrow } from "../../Theme/Icons/arrowRight.svg";
import { ReactComponent as LeftArrow } from "../../Theme/Icons/arrowLeft.svg";
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
  const [date, setDate] = useState(new Date());
  const [descriptionInput, setDescriptionInput] = useState("");

  const handleToggle = () => {
    setOpen(!open);
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
    {
      username: "Vlad",
      image: undefined,
    },
  ];

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
        {type === InputTypesCollapse.Text && (
          <div>
            <BetInput
              placeholder="הקלד כאן את התיאור..."
              typography={TypographyTypes.H5}
              value={descriptionInput} 
              onChange={(e) => setDescriptionInput(e.target.value)} 
            />
            <NumOfChars>
              <Typography
                value={`${descriptionInput.length} / 100`}
                variant={TypographyTypes.H7}
              />
            </NumOfChars>
          </div>
        )}
        {type === InputTypesCollapse.AddParticipants && (
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
        )}
        {type === InputTypesCollapse.AddConditions && (
          <AddConditionsDiv>
            {users.map((user) => (
              <AddParticipantTag>
                <AddIcon />
                <Typography
                  value={user.fullName || user.username}
                  variant={TypographyTypes.H4}
                />
              </AddParticipantTag>
            ))}
          </AddConditionsDiv>
        )}
        {type === InputTypesCollapse.Files && (
          <AddConditionsDiv>
            <AddParticipantTag>
              <AddIcon />
              <Typography value={"הוסף קובץ"} variant={TypographyTypes.H4} />
            </AddParticipantTag>
          </AddConditionsDiv>
        )}
        {type === InputTypesCollapse.Calender && (
          <AddConditionsDiv>
            <StyledCalendar
              onChange={(value) => setDate(value as Date)}
              value={date}
              nextLabel={<LeftArrow />}
              prevLabel={<RightArrow />}
              next2Label={null}
              prev2Label={null}
              formatShortWeekday={(locale, date) =>
                date.toLocaleDateString(locale, { weekday: "narrow" })
              }
              locale="he"
              showNeighboringMonth={false}
            />
          </AddConditionsDiv>
        )}
      </Collapse>
    </InputDiv>
  );
};

export default FormInputCollapse;
