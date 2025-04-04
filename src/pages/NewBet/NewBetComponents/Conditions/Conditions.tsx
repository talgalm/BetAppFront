import React, { useState } from 'react';
import { Control, FieldValues, Path, useController, useFormContext } from 'react-hook-form';
import InputTextFull from '../../../../components/Inputs/InputTextFull/InputTextFull';
import {
  ConditionsContent,
  ConditionsRowContent,
  ConditionsRowContentCenter,
  StyledAvatar,
} from '../Conditions/Conditions.styles';
import { Typography } from '../../../../components/Topography/topography';
import { TypographyTypes } from '../../../../Theme/Typography/typography';
import { ReactComponent as CalendarIcon } from '../../../../Theme/Icons/CalendarIcon.svg';
import { useTranslation } from 'react-i18next';
import DateModal from '../../../../components/DateModal/DateModal';
import { formatDate } from '../../../../utils/Helpers';
import { CreateFormInputs } from '../../Interface';

interface NewBetParticipantsProps<T extends FieldValues> {
  control?: Control<T>;
  inputName?: Path<T> | undefined;
}

const NewBetConditions = <T extends FieldValues>({
  inputName,
  control,
}: NewBetParticipantsProps<T>): JSX.Element => {
  const { watch } = useFormContext<CreateFormInputs>();
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const {
    field: { value, onChange },
  } = useController({
    control,
    name: inputName || ('' as Path<T>),
  });

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
        watch().Participants?.map((user, userIndex) => {
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
