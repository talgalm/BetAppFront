import { InputTypesCollapse } from "../../pages/FormInputCollapse/InputTypes";
import { TypographyTypes } from "../../Theme/Typography/typography";
import Calendar from "../Calendar/Calendar";
import { Typography } from "../Topography/topography";
import InputTextFull from "./InputTextFull/InputTextFull";
import InputWithPoints, {
  InputWithPointsType,
} from "./InputWithPoints/InputWithPoints";
import { AddConditionsDiv } from "./InputWithPoints/InputWithPoints.styles";
import InputWithTags from "./InputWithTags/InputWithTags";

interface InputByTypeProps {
  type: InputTypesCollapse;
  inputRef: React.RefObject<HTMLInputElement>; // Added the ref prop
}

const InputByType: React.FC<InputByTypeProps> = ({ type, inputRef }) => {
  return (
    <div>
      <Typography
        value={
          "כאן יהיה טקסט תיאור עד 2 שורות אשר שמסביר במילים פשוטות מה עושים כאן"
        }
        variant={TypographyTypes.H6}
      />

      {type === InputTypesCollapse.Text && <InputTextFull inputRef={inputRef} />}
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
    </div>
  );
};

export default InputByType;
