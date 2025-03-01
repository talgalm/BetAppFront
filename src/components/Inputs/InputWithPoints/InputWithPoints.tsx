import { TypographyTypes } from '../../../Theme/Typography/typography';
import { Typography } from '../../Topography/topography';
import { User } from '../../../api/interfaces';
import {
  AddConditionsDiv,
  BetCoinsInput,
  CalendarContainer,
  CoinsContainer,
  ColumnContainer,
  PositionContainer,
} from './InputWithPoints.styles';
import FileUploader from '../../FileUploader/FileUploader';
import { Control, FieldValues, Path, useFormContext } from 'react-hook-form';
import ConditionModal from '../../../pages/ConditionModal/ConditionModal';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InputTextFull from '../InputTextFull/InputTextFull';
import { ReactComponent as CalendarIcon } from '../../../Theme/Icons/CalendarIcon.svg';
import { useAtom } from 'jotai';
import { UseUser } from '../../../Hooks/useGetUser';
import { userAtom } from '../../../Jotai/atoms';

export enum InputWithPointsType {
  FILES,
  CONDITIONS,
}

interface InputWithPointsProps<T extends FieldValues> {
  type: InputWithPointsType;
  control: Control<T>;
  inputName: Path<T>;
}

const InputWithPoints = <T extends FieldValues>({
  type,
  control,
  inputName,
}: InputWithPointsProps<T>) => {
  const { t } = useTranslation();
  const { setValue } = useFormContext();
  const [open, setOpen] = useState(false);
  const [coins, setCoins] = useState<number>(0);
  const [userCurrentCoints, setUserCurrentCoins] = useState<number>(0);

  const handleCoinsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (/^\d*$/.test(value)) {
      const numericValue = Number(value);

      if (user?.points !== undefined) {
        if (numericValue <= user.points) {
          setCoins(numericValue);
          setUserCurrentCoins(user.points - numericValue);
        } else {
          /* empty */
        }
      }
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCleanInput = (index: number) => {
    setValue(`Conditions.${index}.text`, '');
  };

  const [user, setUser] = useAtom(userAtom);
  const { data } = UseUser(user?.id);

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  useEffect(() => {
    if (user?.points !== undefined) {
      setUserCurrentCoins(user.points);
    }
  }, [user]);

  const users: User[] = [
    {
      id: 'TalG',
      fullName: 'טל גלמור',
      image: undefined,
    },
    {
      id: 'Vlad',
      image: undefined,
    },
  ];

  return (
    <AddConditionsDiv>
      <ColumnContainer>
        <Typography value={t('Input.HowMuch')} variant={TypographyTypes.H4} />
        <CoinsContainer>
          <PositionContainer>
            <BetCoinsInput
              value={coins}
              typography={TypographyTypes.H1}
              onChange={handleCoinsChange}
            />
          </PositionContainer>
          <Typography
            value={`${t('Input.YourBalance')} ${userCurrentCoints} ${t('Input.Coins')}`}
            variant={TypographyTypes.H7}
            styleProps={{
              color: '#3E63DD',
              position: 'absolute',
              top: 0,
              right: 0,
            }}
          />
        </CoinsContainer>

        {type === InputWithPointsType.CONDITIONS &&
          users.map((user) => (
            <div key={user.id}>
              <Typography value={user.fullName || user.id} variant={TypographyTypes.H4} />
              <InputTextFull
                control={control}
                inputName={inputName}
                isSetHeight={true}
                displayCharLimit={false}
              />
            </div>
          ))}
        <CalendarContainer onClick={handleOpen}>
          <CalendarIcon color="#3E63DD" />
          <Typography
            value={t('Input.AddDate')}
            variant={TypographyTypes.H5}
            styleProps={{ color: '#3E63DD' }}
          />
        </CalendarContainer>
      </ColumnContainer>

      {type === InputWithPointsType.FILES && <FileUploader inputName={inputName} />}
      <ConditionModal open={open} handleClose={handleClose} />
    </AddConditionsDiv>
  );
};

export default InputWithPoints;
