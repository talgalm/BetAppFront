import React, { useState } from 'react';
import { isArray } from 'lodash';
import { useTranslation } from 'react-i18next';
import { Prediction, ParticipantStatus, User, Bet } from '../../../Interfaces';
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
import { betWinnerAtom, finishBetAtom } from '../../../Jotai/atoms';
import Radio from '@mui/material/Radio';
import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  arrValue?: Prediction[] | (User & { status?: ParticipantStatus });
  currentUser?: User;
  isOpen: boolean;
  Icon?: React.ElementType;
}

const ParticipentsListBet: React.FC<Props> = ({ arrValue, currentUser, isOpen, Icon }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(['user-profile']);
  const bet = queryClient.getQueryData<Bet>(['bet', id]);

  const [isFinish] = useAtom(finishBetAtom);
  const [pickedWinners, setPickedWinners] = useAtom(betWinnerAtom);

  const handlePickWinner = (userId: string) => {
    const mode = isFinish?.mode;

    setPickedWinners((prev) => {
      const alreadyPicked = prev.includes(userId);

      if (alreadyPicked) {
        return prev.filter((id) => id !== userId);
      }

      if (mode === 'single') {
        return [userId];
      }

      return [...prev, userId];
    });
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
              onClick={() => handlePickWinner(participant.userId ?? '')}
              selected={pickedWinners.some((winnerId) => winnerId === participant.userId)}
              finisMode={isFinish?.isFinished ?? false}
            >
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
                    checked={pickedWinners.some((winnerId) => winnerId === participant.userId)}
                  />
                )}
              </UserListRowContainer>
              <Typography
                value={participant.guess}
                variant={TypographyTypes.TextSmall}
                styleProps={{ color: 'black' }}
              />
              {participant.date && (
                <SummaryRow background={'#CED0EF'}>
                  <Typography
                    value={formatDate(participant.date)}
                    variant={TypographyTypes.TextMedium}
                    styleProps={{ color: 'black' }}
                  />
                  {Icon && <Icon width={18} height={18} />}
                </SummaryRow>
              )}
            </UserListRowWithBorderContainer>
          ))}
        </DetailsListView>
      </AvatarRow>
      {isOpen && !isFinish && bet?.creator === user?.id && (
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
