import React from 'react';
import { isArray } from 'lodash';
import { useTranslation } from 'react-i18next';
import { Prediction, ParticipantStatus, User } from '../../../Interfaces';
import { AvatarRow, SmallAvatar } from '../BetPage.styles';
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

interface Props {
  arrValue?: Prediction[] | (User & { status?: ParticipantStatus });
  currentUser?: User;
  isOpen: boolean;
  Icon?: React.ElementType;
}

const RenderUserList: React.FC<Props> = ({ arrValue, currentUser, isOpen, Icon }) => {
  const { t } = useTranslation();
  if (!isArray(arrValue)) return null;

  const sorted = [...arrValue].sort((a, b) => {
    if (!currentUser) return 0;
    if (a.userId === currentUser.id) return -1;
    if (b.userId === currentUser.id) return 1;
    return 0;
  });

  return (
    <UserListContainer>
      <AvatarRow isOpen={isOpen}>
        {sorted.map((participant) => (
          <div key={participant.userId}>
            {isOpen ? (
              <UserListRowWithBorderContainer>
                <UserListRowContainer>
                  <SmallAvatar status={participant.status ?? ParticipantStatus.PENDING}>
                    {participant.fullName?.charAt(0)}
                  </SmallAvatar>
                  <Typography
                    value={participant.fullName}
                    variant={TypographyTypes.TextMedium}
                    styleProps={{ color: 'black' }}
                  />
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
            ) : (
              <SmallAvatar status={participant.status ?? ParticipantStatus.PENDING}>
                {participant.fullName?.charAt(0)}
              </SmallAvatar>
            )}
          </div>
        ))}
      </AvatarRow>
      {isOpen && (
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

export default RenderUserList;
