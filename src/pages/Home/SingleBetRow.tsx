import {
  TagStyled,
  NotificationContainer,
  NotificationHeader,
  NotificationRow,
  NotificationTextHeader,
  StyledAvatarGroup,
} from './SingleBetRow.styles';
import { Bet, ParticipantStatus, Prediction, User } from '../../Interfaces';
import { ReactComponent as BetimIcon } from '../../Theme/Icons/HomeIcons/BetimIcon.svg';
import { Typography } from '../../components/Topography/topography';
import { formatDate } from '../../utils/Helpers';
import { TypographyTypes } from '../../components/Topography/TypographyTypes';
import Tag, { TagType } from '../../components/Tag/TagComponent';
import { useNavigate } from 'react-router-dom';
import { SmallAvatar } from '../Bet/BetPage.styles';
import ParticipantActionRow from './ParticipantActionRow/ParticipantActionRow';
import { getParticipantAwareTagType } from '../../utils/betUtils';
import { useQueryClient } from '@tanstack/react-query';

interface SingleBetRowProps {
  bet: Bet;
  isSupervisor?: boolean;
}

const SingleBetRow = ({ bet, isSupervisor }: SingleBetRowProps): JSX.Element => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(['user-profile']);

  const tagType = getParticipantAwareTagType(bet, user?.id);
  const isPending = tagType === TagType.PENDING_APPROVAL;

  const handleBet = () => {
    if (bet) {
      navigate(`/bet/${bet.id}`);
    }
  };

  return (
    <NotificationContainer onClick={handleBet}>
      <NotificationHeader>
        <Tag type={tagType} />
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
          <TagStyled background="#CED0EF">
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
              <SmallAvatar key={index} status={participant?.status ?? ParticipantStatus.PENDING}>
                {participant.fullName?.charAt(0)}
              </SmallAvatar>
            ))}
        </StyledAvatarGroup>
      </NotificationRow>
      {isPending && (
        <ParticipantActionRow betId={bet?.id ?? ''} predictions={bet?.predictions || []} />
      )}
    </NotificationContainer>
  );
};

export default SingleBetRow;
