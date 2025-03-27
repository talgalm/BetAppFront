import {
  CoinContainer,
  CoinsGridContainer,
  ConditionsContent,
  ConditionsRowContent,
  ContentContainer,
  FilesContainer,
  FilesRow,
  RowCoinContentContainer,
  RowContentContainer,
} from '../NewBet.styles';
import { Typography } from '../../../components/Topography/topography';
import { TypographyTypes } from '../../../Theme/Typography/typography';
import { useTranslation } from 'react-i18next';
import { Control, FieldValues, Path } from 'react-hook-form';
import InputTextFull from '../../../components/Inputs/InputTextFull/InputTextFull';
import { NewBetStepValueTypes } from '../Interface';
import { useEffect, useState } from 'react';
import { UseUser } from '../../../Hooks/useGetUser';
import { userAtom } from '../../../Jotai/atoms';
import { useAtom } from 'jotai';
import Calendar from '../../../components/Calendar/Calendar';
import { ReactComponent as DisplayIcon } from '../../../Theme/Icons/NewBetDisplay.svg';
import { User } from '../../../api/interfaces';
import { Avatar } from '@mui/material';
import { ReactComponent as BetimIcon } from '../../../Theme/Icons/Betim.svg';
import { ReactComponent as UploadFileIcon } from '../../../Theme/Icons/UploadIcon.svg';
import { PRIMARY_COLOR } from '../../../Theme/ColorTheme';
import BetimModal from '../BetimModal/BetimModal';
import StyledButton from '../../../components/Button/StyledButton';
import { ReactComponent as CalendarIcon } from '../../../Theme/Icons/CalendarIcon.svg';
import NewBetParticipants from '../NewBetComponents/Participants';

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
  const [coins, setCoins] = useState<number>(0);
  const [userCurrentCoints, setUserCurrentCoins] = useState<number>(0);
  const [user, setUser] = useAtom(userAtom);
  const { data } = UseUser(user?.id);
  const BetimArray = [20, 30, 40, -1];
  const [openModal, setOpenModal] = useState(false);
  // const { mostActives = [] } = useGetMostActives(user?.id);

  const mostActives: User[] = [
    { id: 'TalGalmor', fullName: 'Tal Galmor', phoneNumber: '054-4363655' },
    { id: 'TalGalmor', fullName: 'Tal Galmor', phoneNumber: '054-4363655' },
    { id: 'TalGalmor', fullName: 'Tal Galmor', phoneNumber: '054-4363655' },
    { id: 'TalGalmor', fullName: 'Tal Galmor', phoneNumber: '054-4363655' },
    { id: 'TalGalmor', fullName: 'Tal Galmor', phoneNumber: '054-4363655' },
  ];

  const users: User[] = [
    { id: 'TalGalmor', fullName: 'Tal Galmor', phoneNumber: '054-4363655' },
    { id: 'TalGalmor', fullName: 'Tal Galmor', phoneNumber: '054-4363655' },
    { id: 'TalGalmor', fullName: 'Tal Galmor', phoneNumber: '054-4363655' },
  ];

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

  const handleCoinsChange = (value: number) => {
    if (value === -1) {
      setOpenModal(true);
      return;
    }
    const numericValue = Number(value);

    if (user?.points !== undefined) {
      if (numericValue <= user.points) {
        setCoins(numericValue);
        setUserCurrentCoins(user.points - numericValue);
      } else {
        /* empty */
      }
    }
  };

  const renderCoin = (item: number, index: number) => {
    const isSelected =
      coins === item || (coins !== 0 && !BetimArray.includes(coins) && index === 3);

    if (item === -1) {
      return (
        <CoinContainer key={index} onClick={() => handleCoinsChange(item)} isSelected={isSelected}>
          {coins !== 0 && !BetimArray.includes(coins) ? (
            <>
              <BetimIcon color={PRIMARY_COLOR} />
              <Typography
                value={coins}
                variant={TypographyTypes.H3}
                styleProps={{ color: PRIMARY_COLOR }}
              />
            </>
          ) : (
            <Typography
              value={t('NewBet.other')}
              variant={TypographyTypes.H3}
              styleProps={{ color: PRIMARY_COLOR }}
            />
          )}
        </CoinContainer>
      );
    }

    return (
      <CoinContainer key={index} onClick={() => handleCoinsChange(item)} isSelected={isSelected}>
        <BetimIcon color={PRIMARY_COLOR} />
        <Typography
          value={item}
          variant={TypographyTypes.H3}
          styleProps={{ color: PRIMARY_COLOR }}
        />
      </CoinContainer>
    );
  };

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
        <>
          <RowContentContainer>
            <Typography
              value={`${t('Input.YourBalance')} ${userCurrentCoints} ${t('Input.Coins')}`}
              variant={TypographyTypes.H10}
            />
          </RowContentContainer>
          <CoinsGridContainer>
            {BetimArray.map((item, index) => (
              <RowCoinContentContainer key={index}>
                <CoinContainer
                  onClick={() => handleCoinsChange(item)}
                  isSelected={
                    coins === item || (coins !== 0 && !BetimArray.includes(coins) && index === 3)
                  }
                >
                  {item === -1 ? (
                    coins !== 0 && !BetimArray.includes(coins) ? (
                      <>
                        <BetimIcon color={PRIMARY_COLOR} />
                        <Typography
                          value={coins}
                          variant={TypographyTypes.H3}
                          styleProps={{ color: PRIMARY_COLOR }}
                        />
                      </>
                    ) : (
                      <Typography
                        value={t(`NewBet.other`)}
                        variant={TypographyTypes.H3}
                        styleProps={{ color: PRIMARY_COLOR }}
                      />
                    )
                  ) : (
                    <>
                      <BetimIcon color={PRIMARY_COLOR} />
                      <Typography
                        value={item}
                        variant={TypographyTypes.H3}
                        styleProps={{ color: PRIMARY_COLOR }}
                      />
                    </>
                  )}
                </CoinContainer>
              </RowCoinContentContainer>
            ))}
          </CoinsGridContainer>
          <BetimModal
            isOpen={openModal}
            closeModal={() => setOpenModal(false)}
            setCoins={handleCoinsChange}
          />
        </>
      )}
      {inputName && control && type === NewBetStepValueTypes.Deadline && (
        <Calendar control={control} inputName={inputName} />
      )}
      {inputName && control && type === NewBetStepValueTypes.Conditions && (
        <ConditionsContent>
          {users.map((item, index) => (
            <ConditionsRowContent key={index}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: -5 }}>
                <Avatar sx={{ bgcolor: 'grey', width: 24, height: 24, fontSize: 11 }}>
                  {item.fullName?.charAt(0)}{' '}
                </Avatar>
                <Typography
                  value={item.fullName || ''}
                  variant={TypographyTypes.H7}
                  styleProps={{ color: 'black' }}
                />
              </div>
              <InputTextFull
                control={control}
                inputName={inputName}
                isSetHeight={true}
                displayCharLimit={false}
                placeholder={t(`NewBet.EnterCondition`)}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <CalendarIcon color="#15AB94" />

                <Typography
                  value={'הוסף תאריך'}
                  variant={TypographyTypes.H7}
                  styleProps={{ color: '#15AB94' }}
                />
              </div>
            </ConditionsRowContent>
          ))}
        </ConditionsContent>
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
