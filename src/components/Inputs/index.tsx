import { useTranslation } from "react-i18next";
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
  control: any;
  inputName: string;
}

const InputByType: React.FC<InputByTypeProps> = ({
  type,
  control,
  inputName,
}) => {
  const { t } = useTranslation();
  return (
    <div>
      <Typography value={t("Input.Description")} variant={TypographyTypes.H6} />

      {type === InputTypesCollapse.Text && (
        <InputTextFull control={control} inputName={inputName} />
      )}
      {type === InputTypesCollapse.AddParticipants && <InputWithTags />}
      {type === InputTypesCollapse.AddConditions && (
        <InputWithPoints
          control={control}
          inputName={inputName}
          type={InputWithPointsType.CONDITIONS}
        />
      )}
      {type === InputTypesCollapse.Files && (
        <InputWithPoints
          control={control}
          inputName={inputName}
          type={InputWithPointsType.FILES}
        />
      )}
      {type === InputTypesCollapse.Calender && (
        <AddConditionsDiv>
          <Calendar control={control} inputName={inputName} />
        </AddConditionsDiv>
      )}
    </div>
  );
};

export default InputByType;
