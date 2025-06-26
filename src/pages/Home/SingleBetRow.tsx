import {
  TagStyled,
  NotificationContainer,
  NotificationHeader,
  NotificationRow,
  NotificationTextHeader,
  StyledAvatarGroup,
} from './SingleBetRow.styles';
import { ReactComponent as BetimIcon } from '@assets/icons/homeIcons/BetimIcon.svg';
import { Typography } from '@components/Topography/typography';
import { formatDate } from '@utils/Helpers';
import { TypographyTypes } from '@components/Topography/TypographyTypes';
import Tag, { TagType } from '@components/Tag/TagComponent';
import { useNavigate } from 'react-router-dom';
import { SmallAvatar } from '../Bet/BetPage.styles';
import ParticipantActionRow from './ParticipantActionRow/ParticipantActionRow';
import { getParticipantAwareTagType } from '@utils/betUtils';
import { useQueryClient } from '@tanstack/react-query';
import { useSocketUpdates } from '@connection/useSocketUpdates';
import { useState } from 'react';
import { Bet } from '@interfaces/Bet.interface';
import { Prediction, ParticipantStatus } from '@interfaces/Prediction.interface';
import { User } from '@interfaces/User.interface';

interface SingleBetRowProps {
  bet: Bet;
  isSupervisor?: boolean;
}

const SingleBetRow = ({ bet, isSupervisor }: SingleBetRowProps): JSX.Element => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(['user-profile']);

  const tagType = getParticipantAwareTagType(bet, user?.id);
  const needActionRow = tagType === TagType.PENDING_APPROVAL || tagType === TagType.DRAFT;

  const handleBet = () => {
    if (bet) {
      navigate(`/bet/${bet.id}`);
    }
  };

  const [animate, setAnimate] = useState(false);

  useSocketUpdates((updatedBetId: string) => {
    if (updatedBetId === bet.id) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 1500);
    }
  });

  return (
    <NotificationContainer onClick={handleBet} animate={animate}>
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
              <SmallAvatar
                key={index}
                status={participant?.status ?? ParticipantStatus.PENDING}
                src={participant.image}
              >
                {participant.fullName?.charAt(0)}
              </SmallAvatar>
            ))}
        </StyledAvatarGroup>
      </NotificationRow>
      {needActionRow && <ParticipantActionRow betId={bet?.id ?? ''} type={tagType} />}
    </NotificationContainer>
  );
};

export default SingleBetRow;
