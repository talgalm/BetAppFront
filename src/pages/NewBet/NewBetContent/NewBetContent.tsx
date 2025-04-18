import { ContentContainer, RowContentContainer } from '../NewBet.styles';
import { Typography } from '../../../components/Topography/topography';
import { TypographyTypes } from '../../../Theme/Typography/typography';
import { useTranslation } from 'react-i18next';
import { Control, FieldValues, Path } from 'react-hook-form';
import StyledInput from '../../../components/Inputs/StyledInput/StyledInput';
import { NewBetStepValueTypes } from '../Interface';
import { useEffect } from 'react';
import { UseUser } from '../../../Hooks/useGetUser';
import { userAtom } from '../../../Jotai/atoms';
import { useAtom } from 'jotai';
import Calendar from '../../../components/Calendar/Calendar';
import { ReactComponent as DisplayIcon } from '../../../Theme/Icons/NewBetDisplay.svg';
import NewBetParticipants from '../NewBetComponents/Participants/Participants';
import NewBetConditions from '../NewBetComponents/Conditions/Conditions';
import Betim from '../NewBetComponents/Betim/Betim';
import NewBetFiles from '../NewBetComponents/Files/Files';
import NewBetSummary from '../NewBetComponents/Summary/Summary';

interface NewBetProps<T extends FieldValues> {
  type?: NewBetStepValueTypes;
  control?: Control<T>;
  inputName: Path<T> | undefined;
}

const NewBetContent = <T extends FieldValues>({
  type,
  inputName,
  control,
}: NewBetProps<T>): JSX.Element => {
  const { t } = useTranslation();
  const [user, setUser] = useAtom(userAtom);
  const { data } = UseUser(user?.id);

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

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
      {(type === NewBetStepValueTypes.Description || type === NewBetStepValueTypes.Name) && (
        <div style={{ width: '100%', paddingTop: 16, paddingBottom: 16 }}>
          {inputName && type === NewBetStepValueTypes.Name && (
            <StyledInput
              control={control}
              inputName={inputName}
              extended={false}
              displayCharLimit={false}
              placeholder={t(`NewBet.${type}Title`)}
            />
          )}
          {inputName && type === NewBetStepValueTypes.Description && (
            <StyledInput
              control={control}
              inputName={inputName}
              extended={true}
              displayCharLimit={false}
              placeholder={t(`NewBet.${type}Title`)}
            />
          )}
        </div>
      )}
      {inputName && type === NewBetStepValueTypes.Coins && (
        <Betim control={control} inputName={inputName} />
      )}
      {inputName && control && type === NewBetStepValueTypes.Deadline && (
        <div style={{ width: '100%', paddingTop: 16, paddingBottom: 16 }}>
          <Calendar control={control} inputName={inputName} displayAddToCalendar />
        </div>
      )}
      {inputName && control && type === NewBetStepValueTypes.Conditions && (
        <NewBetConditions control={control} inputName={inputName} />
      )}
      {inputName && type === NewBetStepValueTypes.Files && <NewBetFiles inputName={inputName} />}
      {inputName && type === NewBetStepValueTypes.Participants && (
        <NewBetParticipants inputName={inputName} control={control} />
      )}
      {inputName && type === NewBetStepValueTypes.Supervisor && (
        <NewBetParticipants limit={1} inputName={inputName} control={control} />
      )}
      {type === NewBetStepValueTypes.Summary && <NewBetSummary />}
    </ContentContainer>
  );
};

export default NewBetContent;
