import { useTranslation } from 'react-i18next';
import { InputTypesCollapse } from '../../pages/FormInputCollapse/InputTypes';
import { TypographyTypes } from '../../Theme/Typography/typography';
import Calendar from '../Calendar/Calendar';
import { Typography } from '../Topography/topography';
import InputTextFull from './InputTextFull/InputTextFull';
import InputWithPoints, { InputWithPointsType } from './InputWithPoints/InputWithPoints';
import { AddConditionsDiv } from './InputWithPoints/InputWithPoints.styles';
import InputWithTags from './InputWithTags/InputWithTags';
import { Control, FieldValues, Path } from 'react-hook-form';

interface InputByTypeProps<T extends FieldValues> {
  type: InputTypesCollapse;
  control: Control<T>;
  inputName: Path<T>;
}

const InputByType = <T extends FieldValues>({
  type,
  control,
  inputName,
}: InputByTypeProps<T>): JSX.Element => {
  const { t } = useTranslation();
  return (
    <div>
      {type === InputTypesCollapse.Text && (
        <InputTextFull control={control} inputName={inputName} />
      )}
      {type === InputTypesCollapse.AddParticipants && (
        <InputWithTags control={control} inputName="input" />
      )}
      {type === InputTypesCollapse.Supervisor && (
        <InputWithTags control={control} inputName="input" limit={1} />
      )}
      {type === InputTypesCollapse.AddConditions && (
        <InputWithPoints
          control={control}
          inputName={inputName}
          type={InputWithPointsType.CONDITIONS}
        />
      )}
      {type === InputTypesCollapse.Files && (
        <InputWithPoints control={control} inputName={inputName} type={InputWithPointsType.FILES} />
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
