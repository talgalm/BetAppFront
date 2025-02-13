import { TypographyTypes } from '../../../Theme/Typography/typography';
import { Typography } from '../../Topography/topography';
import { ReactComponent as AddIcon } from '../../../Theme/Icons/AddGray.svg';
import { User } from '../../../api/interfaces';
import {
  AddConditionsDiv,
  AddParticipantTag,
  CollapseOuterDiv,
  ColumnConditionDiv,
  IconsDiv,
} from './InputWithPoints.styles';
import FileUploader from '../../FileUploader/FileUploader';
import { Control, FieldValues, useFormContext } from 'react-hook-form';
import ConditionModal from '../../../pages/ConditionModal/ConditionModal';
import { useState } from 'react';

export enum InputWithPointsType {
  FILES,
  CONDITIONS,
}

interface InputWithPointsProps<T extends FieldValues> {
  type: InputWithPointsType;
  control: Control<T>;
  inputName: string;
}

const InputWithPoints = <T extends FieldValues>({
  type,
  control,
  inputName,
}: InputWithPointsProps<T>) => {
  const { setValue } = useFormContext();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCleanInput = (index: number) => {
    setValue(`Conditions.${index}.text`, '');
  };

  const users: User[] = [
    {
      username: 'TalG',
      fullName: 'טל גלמור',
      image: undefined,
    },
    {
      username: 'Vlad',
      image: undefined,
    },
  ];

  return (
    <AddConditionsDiv>
      {type === InputWithPointsType.CONDITIONS &&
        users.map((user, index) => (
          <CollapseOuterDiv key={user.username}>
            <AddParticipantTag>
              <AddIcon />
              <ColumnConditionDiv onClick={handleOpen}>
                <Typography value={user.fullName || user.username} variant={TypographyTypes.H4} />
                <IconsDiv>
                  <AddIcon />
                  <AddIcon />
                  <AddIcon />
                </IconsDiv>
              </ColumnConditionDiv>
            </AddParticipantTag>
          </CollapseOuterDiv>
        ))}

      {type === InputWithPointsType.FILES && <FileUploader inputName={inputName} />}
      <ConditionModal open={open} handleClose={handleClose} />
    </AddConditionsDiv>
  );
};

export default InputWithPoints;
