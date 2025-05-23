import React, { useState } from 'react';
import { isArray } from 'lodash';
import { useTranslation } from 'react-i18next';
import { Prediction, ParticipantStatus, User } from '../../../Interfaces';
import { AvatarRow, AvatarsOnlyView, DetailsListView, SmallAvatar } from '../BetPage.styles';
import {
  AddParticipentRow,
  UserListContainer,
  UserListRowContainer,
  UserListRowWithBorderContainer,
} from './BetPageRow.styles';
import { Typography } from '../../../components/Topography/topography';
import { TypographyTypes } from '../../../components/Topography/TypographyTypes';
import { formatDate } from '../../../utils/Helpers';
import { ReactComponent as AddIcon } from '../../../Theme/Icons/Bet/AddIcon.svg';
import { SummaryRow } from '../../NewBet/NewBetComponents/Summary/Summary.styles';
import { useAtom } from 'jotai';
import { finishBetAtom } from '../../../Jotai/atoms';
import Radio from '@mui/material/Radio';

interface Props {
  arrValue?: Prediction[] | (User & { status?: ParticipantStatus });
  currentUser?: User;
  isOpen: boolean;
  Icon?: React.ElementType;
}

const ParticipentsListBet: React.FC<Props> = ({ arrValue, currentUser, isOpen, Icon }) => {
  const { t } = useTranslation();
  const [isFinish] = useAtom(finishBetAtom);
  const [pickedWinner, setPickWinner] = useState<Prediction | null>(null);

  const handlePickWinner = (userId: string) => {
    const selected = sorted.find((p) => p.id === userId) || null;
    setPickWinner(selected);
  };

  if (!isArray(arrValue)) return null;

  const sorted = [...arrValue].sort((a, b) => {
    if (!currentUser) return 0;
    if (a.userId === currentUser.id) return -1;
    if (b.userId === currentUser.id) return 1;
    return 0;
  });

  return (
    <UserListContainer>
      <AvatarRow>
        <AvatarsOnlyView isVisible={!isOpen}>
          {sorted.map((participant) => (
            <SmallAvatar
              key={participant.userId}
              status={participant.status ?? ParticipantStatus.PENDING}
            >
              {participant.fullName?.charAt(0)}
            </SmallAvatar>
          ))}
        </AvatarsOnlyView>

        <DetailsListView isVisible={isOpen}>
          {sorted.map((participant: Prediction) => (
            <UserListRowWithBorderContainer
              key={participant.userId}
              onClick={() => handlePickWinner(participant.id)}
            >
              {' '}
              <UserListRowContainer>
                <div style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
                  <SmallAvatar status={participant.status ?? ParticipantStatus.PENDING}>
                    {participant.fullName?.charAt(0)}
                  </SmallAvatar>
                  <Typography
                    value={participant.fullName}
                    variant={TypographyTypes.TextMedium}
                    styleProps={{ color: 'black' }}
                  />
                </div>
                {isOpen && isFinish && (
                  <Radio
                    name="winner"
                    value={participant.userId}
                    checked={pickedWinner?.userId === participant.userId}
                  />
                )}
              </UserListRowContainer>
              <Typography
                value={participant.guess}
                variant={TypographyTypes.TextMedium}
                styleProps={{ color: 'black' }}
              />
              {participant.date && (
                <SummaryRow>
                  <Typography
                    value={formatDate(participant.date)}
                    variant={TypographyTypes.TextSmall}
                    styleProps={{ color: 'black' }}
                  />
                  {Icon && <Icon width={18} height={18} />}
                </SummaryRow>
              )}
            </UserListRowWithBorderContainer>
          ))}
        </DetailsListView>
      </AvatarRow>
      {isOpen && !isFinish && (
        <AddParticipentRow>
          <AddIcon />
          <Typography
            value={t('BetPage.addParticipent')}
            variant={TypographyTypes.TextMedium}
            styleProps={{ color: '#5862CA' }}
          />
        </AddParticipentRow>
      )}
    </UserListContainer>
  );
};

export default ParticipentsListBet;
