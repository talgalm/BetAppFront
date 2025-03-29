import { ContentContainer, FilesContainer, FilesRow, RowContentContainer } from '../NewBet.styles';
import { Typography } from '../../../components/Topography/topography';
import { TypographyTypes } from '../../../Theme/Typography/typography';
import { useTranslation } from 'react-i18next';
import { Control, FieldValues, Path } from 'react-hook-form';
import InputTextFull from '../../../components/Inputs/InputTextFull/InputTextFull';
import { NewBetStepValueTypes } from '../Interface';
import { useEffect } from 'react';
import { UseUser } from '../../../Hooks/useGetUser';
import { userAtom } from '../../../Jotai/atoms';
import { useAtom } from 'jotai';
import Calendar from '../../../components/Calendar/Calendar';
import { ReactComponent as DisplayIcon } from '../../../Theme/Icons/NewBetDisplay.svg';

import { ReactComponent as UploadFileIcon } from '../../../Theme/Icons/UploadIcon.svg';
import StyledButton from '../../../components/Button/StyledButton';
import NewBetParticipants from '../NewBetComponents/Participants';
import NewBetConditions from '../NewBetComponents/Conditions';
import Betim from '../NewBetComponents/Betim';

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
  // const { mostActives = [] } = useGetMostActives(user?.id);

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
          variant={TypographyTypes.H3}
          styleProps={{ color: 'black' }}
        />
      </RowContentContainer>
      <RowContentContainer>
        <Typography
          value={t(`NewBet.${type}Subtitle`)}
          variant={TypographyTypes.H4}
          styleProps={{ color: 'black' }}
        />
      </RowContentContainer>
      <RowContentContainer>
        <Typography
          value={t(`NewBet.${type}Subtitle2`)}
          variant={TypographyTypes.H5}
          styleProps={{ color: 'black' }}
        />
      </RowContentContainer>
      {inputName && type === NewBetStepValueTypes.Name && (
        <InputTextFull
          control={control}
          inputName={inputName}
          isSetHeight={true}
          displayCharLimit={false}
          placeholder={t(`NewBet.${type}Title`)}
        />
      )}
      {inputName && type === NewBetStepValueTypes.Description && (
        <>
          <InputTextFull
            control={control}
            inputName={inputName}
            isSetHeight={false}
            displayCharLimit={false}
            placeholder={t(`NewBet.${type}Title`)}
          />
        </>
      )}
      {inputName && type === NewBetStepValueTypes.Coins && (
        <Betim control={control} inputName={inputName} />
      )}
      {inputName && control && type === NewBetStepValueTypes.Deadline && (
        <Calendar control={control} inputName={inputName} displayAddToCalendar />
      )}
      {inputName && control && type === NewBetStepValueTypes.Conditions && (
        <NewBetConditions control={control} inputName={inputName} />
      )}
      {inputName && type === NewBetStepValueTypes.Files && (
        <FilesContainer>
          <UploadFileIcon />
          <FilesRow>
            <Typography
              value={t(`NewBet.uploadFilesTitle`)}
              variant={TypographyTypes.H5}
              styleProps={{ color: '#001845', fontWeight: 500 }}
            />
            <Typography
              value={t(`NewBet.uploadFilesSubtitle`)}
              variant={TypographyTypes.H6}
              styleProps={{ color: '#7F8CB9', fontWeight: 400 }}
            />
          </FilesRow>
          <StyledButton
            value={t(`NewBet.uploadFilesbutton`)}
            styleProps={{
              width: '50%',
              backgroundColor: 'white',
              height: 40,
              color: '#15AB94',
              border: '2px solid #15AB94',
            }}
          />
        </FilesContainer>
      )}
      {inputName && type === NewBetStepValueTypes.Participants && (
        <NewBetParticipants inputName={inputName} control={control} />
      )}
      {inputName && type === NewBetStepValueTypes.Supervisor && (
        <NewBetParticipants limit={1} inputName={inputName} control={control} />
      )}
    </ContentContainer>
  );
};

export default NewBetContent;
