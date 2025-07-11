import React, { useState } from 'react';
import { Control, FieldValues, Path, useController, useFormContext } from 'react-hook-form';
import StyledInput from '@components/Inputs/StyledInput/StyledInput';
import {
  ConditionsContent,
  ConditionsRowContent,
  ConditionsRowContentCenter,
  StyledAvatar,
} from './Conditions.styles';
import { Typography } from '@components/Topography/typography';
import { ReactComponent as CalendarIcon } from '@assets/icons/CalendarIcon.svg';
import { useTranslation } from 'react-i18next';
import DateModal from '@components/DateModal/DateModal';
import { formatDate } from '@utils/Helpers';
import { CreateBetInputs } from '../../new-bet-steps';
import { TagStyled } from '../../../home/SingleBetRow.styles';
import { TypographyTypes } from '@components/Topography/TypographyTypes';
import { useAtom } from 'jotai';
import { HeaderStyle } from '@theme/layoutStyles';
import { headerAtom } from '@store/layoutAtoms';
import { PRIMARY_GREEN, LIGHT_GREEN, PRIMARY_BLACK } from '@theme/colorTheme';

interface NewBetParticipantsProps<T extends FieldValues> {
  control?: Control<T>;
  inputName?: Path<T> | undefined;
}

const NewBetConditions = <T extends FieldValues>({
  inputName,
  control,
}: NewBetParticipantsProps<T>): JSX.Element => {
  const { watch } = useFormContext<CreateBetInputs>();
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [_, setHeader] = useAtom(headerAtom);

  const {
    field: { value, onChange },
  } = useController({
    control,
    name: inputName || ('' as Path<T>),
  });

  const handleCloseModal = () => {
    // if (currentIndex) handleDateChange('', currentIndex);
    setCurrentIndex(null);
    setHeader(HeaderStyle.PRIMARY);
  };

  const handleOpenModal = (index: number) => {
    setHeader(HeaderStyle.SECONDARY);
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
        watch().participents?.map((user, userIndex) => {
          const userDate = value?.[userIndex]?.date || '';
          return (
            <ConditionsRowContent key={userIndex}>
              <ConditionsRowContentCenter>
                <StyledAvatar> {user.fullName?.charAt(0)} </StyledAvatar>
                <Typography
                  value={user.fullName?.split(' ')[0] || ''}
                  variant={TypographyTypes.TextBig}
                  styleProps={{ color: PRIMARY_BLACK }}
                />
              </ConditionsRowContentCenter>

              <StyledInput
                control={control}
                inputName={`${inputName}.${userIndex}.guess` as Path<T>}
                placeholder={t(`NewBet.EnterCondition`)}
              />

              <ConditionsRowContentCenter onClick={() => handleOpenModal(userIndex)}>
                {!userDate && <CalendarIcon color={PRIMARY_GREEN} />}
                {!userDate && (
                  <Typography
                    value={t(`NewBet.ConditionAddDate`)}
                    variant={TypographyTypes.TextMedium}
                    styleProps={{ color: PRIMARY_GREEN }}
                  />
                )}
                {userDate && (
                  <TagStyled background={LIGHT_GREEN}>
                    <Typography value={formatDate(userDate)} variant={TypographyTypes.TextMedium} />
                  </TagStyled>
                )}
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
