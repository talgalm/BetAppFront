import { TypographyTypes } from '../../../Theme/Typography/typography';
import { Typography } from '../../Topography/topography';
import { User } from '../../../api/interfaces';
import {
  AddConditionsDiv,
  BetCoinsInput,
  CalendarContainer,
  CoinsContainer,
  ColumnContainer,
  Line,
  PositionContainer,
} from './InputWithPoints.styles';
import FileUploader from '../../FileUploader/FileUploader';
import { Control, FieldValues, Path, useFormContext } from 'react-hook-form';
import ConditionModal from '../../../pages/ConditionModal/ConditionModal';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import StyledInput from '../InputTextFull/InputTextFull';
import { ReactComponent as CalendarIcon } from '../../../Theme/Icons/CalendarIcon.svg';
import { useAtom } from 'jotai';
import { UseUser } from '../../../Hooks/useGetUser';
import { userAtom } from '../../../Jotai/atoms';

interface InputWithPointsProps<T extends FieldValues> {
  control: Control<T, any>;
  inputName: Path<T>;
}

const InputWithPoints = <T extends FieldValues>({
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

        {users.map((user) => (
          <div key={user.id}>
            <Typography value={user.fullName || user.id} variant={TypographyTypes.H4} />
            <StyledInput
              control={control}
              inputName={inputName}
              extended={true}
              displayCharLimit={false}
            />
          </div>
        ))}

        <Line />
        <CalendarContainer onClick={handleOpen}>
          <CalendarIcon color="#48494D" />
          <Typography
            value={t('Input.AddDate')}
            variant={TypographyTypes.H5}
            styleProps={{ color: '#48494D' }}
          />
        </CalendarContainer>
      </ColumnContainer>

      <ConditionModal
        open={open}
        handleClose={handleClose}
        control={control}
        inputName={inputName}
        users={users}
      />
    </AddConditionsDiv>
  );
};

export default InputWithPoints;
