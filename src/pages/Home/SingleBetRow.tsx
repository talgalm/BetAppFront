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
import { Bet, BetStatus } from '../../Interfaces';
import { ReactComponent as BetimIcon } from '../../Theme/Icons/HomeIcons/BetimIcon.svg';

import { Typography } from '../../components/Topography/topography';
import { formatDate } from '../../utils/Helpers';
import { Avatar } from '@mui/material';
import { TypographyTypes } from '../../components/Topography/TypographyTypes';
import Tag, { betStatusToTagType, TagType } from '../../components/Tag/TagComponent';
import { useNavigate } from 'react-router-dom';

interface SingleBetRowProps {
  bet?: Bet;
  type?: BetStatus;
  isSupervisor?: boolean;
}

const SingleBetRow = ({ bet, type, isSupervisor }: SingleBetRowProps): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleBet = () => {
    if (bet) {
      navigate(`/bet/${bet.id}`);
    }
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
          <Avatar alt="Travis Howard" sx={{ width: 24, height: 24 }} />
          <Avatar alt="Cindy Baker" sx={{ width: 24, height: 24 }} />
          <Avatar alt="Travis Howard" sx={{ width: 24, height: 24 }} />
        </StyledAvatarGroup>
      </NotificationRow>
      {type === BetStatus.PENDING && (
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
