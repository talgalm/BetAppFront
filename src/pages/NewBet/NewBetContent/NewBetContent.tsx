import { ContentContainer, RowContentContainer } from '../NewBet.styles';
import { Typography } from '@components/Topography/typography';
import { useTranslation } from 'react-i18next';
import { Control, FieldValues, Path } from 'react-hook-form';
import StyledInput from '@components/Inputs/StyledInput/StyledInput';
import { NewBetStepValueTypes } from '../new-bet-steps';
import Calendar from '@components/Calendar/Calendar';
import { ReactComponent as DisplayIcon } from '@assets/icons/NewBetDisplay.svg';
import { ReactComponent as DisplaySmallIcon } from '@assets/icons/NewBetDisplaySmall.svg';

import NewBetConditions from '../NewBetComponents/conditions-new-bet/Conditions';
import Betim from '../NewBetComponents/betim-new-bet/Betim';
import NewBetFiles from '../NewBetComponents/files-new-bet/Files';
import NewBetSummary from '../NewBetComponents/summary-new-bet/Summary';
import { TypographyTypes } from '@components/Topography/TypographyTypes';
import { useEffect } from 'react';
import { fireConfetti } from '@utils/confetti';
import NewBetParticipants from '../NewBetComponents/participants-new-bet/Participants';

interface NewBetProps<T extends FieldValues> {
  type?: NewBetStepValueTypes;
  control?: Control<T>;
  inputName: Path<T> | undefined;
  clearErrors?: (name?: Path<T> | Path<T>[]) => void;
}

const NewBetContent = <T extends FieldValues>({
  type,
  inputName,
  control,
  clearErrors,
}: NewBetProps<T>): JSX.Element => {
  const { t } = useTranslation();

  useEffect(() => {
    type === NewBetStepValueTypes.Success && fireConfetti();
  }, [type]);

  return (
    <ContentContainer>
      {type === NewBetStepValueTypes.Start && <DisplayIcon />}
      <RowContentContainer>
        <Typography
          value={t(`NewBet.${type}Title`)}
          variant={TypographyTypes.H1}
          styleProps={{ color: 'black' }}
        />
      </RowContentContainer>
      <RowContentContainer>
        <Typography
          value={t(`NewBet.${type}Subtitle`)}
          variant={TypographyTypes.H2}
          styleProps={{ color: 'black' }}
        />
      </RowContentContainer>
      {t(`NewBet.${type}Subtitle2`) !== '' && (
        <RowContentContainer>
          <Typography
            value={t(`NewBet.${type}Subtitle2`)}
            variant={TypographyTypes.H3}
            styleProps={{ color: 'black' }}
          />
        </RowContentContainer>
      )}
      {type === NewBetStepValueTypes.Success && (
        <div style={{ padding: 16 }}>
          <DisplaySmallIcon />
        </div>
      )}
      {(type === NewBetStepValueTypes.description || type === NewBetStepValueTypes.name) && (
        <div style={{ width: '100%', paddingTop: 16, paddingBottom: 16 }}>
          {inputName && type === NewBetStepValueTypes.name && (
            <StyledInput
              control={control}
              inputName={inputName}
              extended={false}
              displayCharLimit={false}
              placeholder={t(`NewBet.${type}Title`)}
              onAnyChange={() => clearErrors?.()}
            />
          )}
          {inputName && type === NewBetStepValueTypes.description && (
            <StyledInput
              control={control}
              inputName={inputName}
              extended={true}
              displayCharLimit={false}
              placeholder={t(`NewBet.${type}Title`)}
              onAnyChange={() => clearErrors?.()}
            />
          )}
        </div>
      )}
      {inputName && type === NewBetStepValueTypes.betim && (
        <Betim control={control} inputName={inputName} />
      )}
      {inputName && control && type === NewBetStepValueTypes.deadline && (
        <div style={{ width: '100%', paddingTop: 8, paddingBottom: 8 }}>
          <Calendar control={control} inputName={inputName} />
        </div>
      )}
      {inputName && control && type === NewBetStepValueTypes.Conditions && (
        <NewBetConditions control={control} inputName={inputName} />
      )}
      {inputName && type === NewBetStepValueTypes.files && <NewBetFiles inputName={inputName} />}
      {inputName && type === NewBetStepValueTypes.participents && (
        <NewBetParticipants inputName={inputName} control={control} />
      )}
      {inputName && type === NewBetStepValueTypes.supervisor && (
        <NewBetParticipants limit={1} inputName={inputName} control={control} />
      )}
      {type === NewBetStepValueTypes.Summary && <NewBetSummary />}
    </ContentContainer>
  );
};

export default NewBetContent;
