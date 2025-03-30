import React, { useState } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import InputTextFull from '../../../../components/Inputs/InputTextFull/InputTextFull';
import {
  ConditionsContent,
  ConditionsRowContent,
  ConditionsRowContentCenter,
  StyledAvatar,
} from '../Conditions/Conditions.styles';
import { Avatar } from '@mui/material';
import { Typography } from '../../../../components/Topography/topography';
import { TypographyTypes } from '../../../../Theme/Typography/typography';
import { ReactComponent as CalendarIcon } from '../../../../Theme/Icons/CalendarIcon.svg';
import { User } from '../../../../api/interfaces';
import { useTranslation } from 'react-i18next';
import DateModal from '../../../../components/DateModal/DateModal';
import { formatDate } from '../../../../utils/Helpers';

interface NewBetParticipantsProps<T extends FieldValues> {
  control?: Control<T>;
  inputName?: Path<T> | undefined;
}

const NewBetConditions = <T extends FieldValues>({
  inputName,
  control,
}: NewBetParticipantsProps<T>): JSX.Element => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const {
    field: { value, onChange },
  } = useController({
    control,
    name: inputName || ('' as Path<T>),
  });

  const users: User[] = [
    { id: 'TalGalmor', fullName: 'Tal Galmor', phoneNumber: '054-4363655' },
    { id: 'User2', fullName: 'User Two', phoneNumber: '054-0000000' },
    { id: 'User3', fullName: 'User Three', phoneNumber: '054-1111111' },
  ];

  const handleCloseModal = (discard?: boolean) => {
    setCurrentIndex(null);
    if (discard) {
      onChange(undefined);
    }
  };

  const handleOpenModal = (index: number) => {
    setCurrentIndex(index);
  };

  const handleDateChange = (newDate: string | undefined, index: number) => {
    const updatedValues = Array.isArray(value) ? [...value] : [];
    updatedValues[index] = { ...updatedValues[index], date: newDate };
    onChange(updatedValues);
  };

  return (
    <ConditionsContent>
      {inputName &&
        control &&
        users.map((user, userIndex) => {
          const userDate = value?.[userIndex]?.date || '';

          return (
            <ConditionsRowContent key={userIndex}>
              <ConditionsRowContentCenter>
                <StyledAvatar> {user.fullName?.charAt(0)} </StyledAvatar>
                <Typography
                  value={user.fullName || ''}
                  variant={TypographyTypes.H7}
                  styleProps={{ color: 'black' }}
                />
              </ConditionsRowContentCenter>

              <InputTextFull
                control={control}
                inputName={`${inputName}.${userIndex}.text` as Path<T>}
                isSetHeight={true}
                displayCharLimit={false}
                placeholder={t(`NewBet.EnterCondition`)}
              />

              <ConditionsRowContentCenter onClick={() => handleOpenModal(userIndex)}>
                {!userDate && <CalendarIcon color="#15AB94" />}
                <Typography
                  value={userDate ? formatDate(userDate) : t(`NewBet.ConditionAddDate`)}
                  variant={TypographyTypes.H7}
                  styleProps={{ color: '#15AB94' }}
                />
              </ConditionsRowContentCenter>
            </ConditionsRowContent>
          );
        })}
      {control && currentIndex !== null && (
        <DateModal
          isOpen={true}
          closeModal={handleCloseModal}
          inputName={`${inputName}.${currentIndex}.date` as Path<T>}
          control={control}
          onChange={(newDate) => handleDateChange(newDate, currentIndex)}
        />
      )}
    </ConditionsContent>
  );
};

export default NewBetConditions;
