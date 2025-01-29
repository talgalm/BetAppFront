import { TypographyTypes } from '../../../Theme/Typography/typography';
import { Typography } from '../../Topography/topography';
import { ReactComponent as AddIcon } from '../../../Theme/Icons/AddGray.svg';
import { User } from '../../../api/interfaces';
import {
  AddConditionsDiv,
  AddParticipantTag,
  CollapseInnerDiv,
  CollapseOuterDiv,
  StyledCancelIcon,
} from './InputWithPoints.styles';
import FileUploader from '../../FileUploader/FileUploader';
import { useState } from 'react';
import { Collapse } from '@mui/material';
import InputTextFull from '../InputTextFull/InputTextFull';
import { ReactComponent as MinusIcon } from '../../../Theme/Icons/Minus.svg';
import { Control, FieldValues, Path, useFormContext } from 'react-hook-form';

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
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { setValue } = useFormContext();

  const handleToggle = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };
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
            <AddParticipantTag onClick={() => handleToggle(index)}>
              {openIndex !== index ? <AddIcon /> : <MinusIcon />}
              <Typography value={user.fullName || user.username} variant={TypographyTypes.H4} />
            </AddParticipantTag>
            <Collapse in={openIndex === index} timeout="auto" unmountOnExit>
              <CollapseInnerDiv>
                <StyledCancelIcon onClick={() => handleCleanInput(index)} />
                <InputTextFull<T>
                  control={control}
                  inputName={`Conditions.${index}.text` as Path<T>}
                  isSetHeight={true}
                />
              </CollapseInnerDiv>
            </Collapse>
          </CollapseOuterDiv>
        ))}

      {type === InputWithPointsType.FILES && <FileUploader inputName={inputName} />}
    </AddConditionsDiv>
  );
};

export default InputWithPoints;
