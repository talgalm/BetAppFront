import { useTranslation } from 'react-i18next';
import {
  TagStyled,
  NotificationContainer,
  NotificationHeader,
  NotificationRow,
  NotificationTextHeader,
  StyledAvatarGroup,
  ActionRow,
} from './SingleBetRow.styles';
import { Bet, BetStatus, Prediction } from '../../Interfaces';
import { ReactComponent as BetimIcon } from '../../Theme/Icons/HomeIcons/BetimIcon.svg';

import { Typography } from '../../components/Topography/topography';
import { formatDate } from '../../utils/Helpers';
import { Avatar } from '@mui/material';
import { TypographyTypes } from '../../components/Topography/TypographyTypes';
import Tag, { betStatusToTagType, TagType } from '../../components/Tag/TagComponent';
import { useNavigate } from 'react-router-dom';
import { SmallAvatar } from '../Bet/BetPage.styles';
import { useAtom } from 'jotai';
import { userAtom } from '../../Jotai/atoms';

interface SingleBetRowProps {
  bet?: Bet;
  type?: BetStatus;
  isSupervisor?: boolean;
}

const SingleBetRow = ({ bet, type, isSupervisor }: SingleBetRowProps): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useAtom(userAtom);

  const handleBet = () => {
    if (bet) {
      navigate(`/bet/${bet.id}`);
    }
  };

  const shouldInvite = () => {
    const myPrediction = bet?.predictions?.find((pred) => pred.userId === user?.id);
    return myPrediction?.approved ?? BetStatus.PENDING;
  };

  return (
    <NotificationContainer onClick={handleBet}>
      <NotificationHeader>
        <Tag type={betStatusToTagType[type || BetStatus.ACTIVE]} />
        {isSupervisor && <Tag type={TagType.SUPERVISOR} />}
      </NotificationHeader>
      <NotificationHeader>
        <NotificationTextHeader>
          <Typography value={bet?.name} variant={TypographyTypes.H3} />
          <Typography value={bet?.description} variant={TypographyTypes.TextMedium} />
        </NotificationTextHeader>
      </NotificationHeader>
      <NotificationRow>
        {bet?.deadline && (
          <TagStyled background="#CEEFEA">
            <Typography value={formatDate(bet?.deadline)} variant={TypographyTypes.TextMedium} />
          </TagStyled>
        )}
        <TagStyled background="#CEEFEA">
          <BetimIcon />
          <Typography value={bet?.betim} variant={TypographyTypes.TextMedium} />
        </TagStyled>
        <StyledAvatarGroup max={6} spacing="small">
          {bet?.predictions &&
            bet?.predictions.map((participant: Prediction, index) => (
              <SmallAvatar key={index} status={participant?.approved ?? 'pending'}>
                {participant.fullName?.charAt(0)}
              </SmallAvatar>
            ))}
        </StyledAvatarGroup>
      </NotificationRow>
      {shouldInvite() === BetStatus.PENDING && (
        <ActionRow>
          <Typography
            value={t(`Home.Confirm`)}
            variant={TypographyTypes.Button}
            styleProps={{ color: '#15AB94' }}
          />
          <Typography
            value={t(`Home.Cancel`)}
            variant={TypographyTypes.Button}
            styleProps={{ color: '#E33E21' }}
          />
        </ActionRow>
      )}
    </NotificationContainer>
  );
};

export default SingleBetRow;
