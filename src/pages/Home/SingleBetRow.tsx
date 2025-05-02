import { useTranslation } from 'react-i18next';
import {
  Tag,
  NotificationContainer,
  NotificationHeader,
  NotificationRow,
  NotificationTextHeader,
  StyledAvatarGroup,
  ActionRow,
} from './SingleBetRow.styles';
import { Bet } from '../../Interfaces';
import { ReactComponent as SupervisorIcon } from '../../Theme/Icons/HomeIcons/SupervisorNotification.svg';
import { ReactComponent as BetIcon } from '../../Theme/Icons/HomeIcons/BetNotification.svg';
import { ReactComponent as BetimIcon } from '../../Theme/Icons/HomeIcons/BetimIcon.svg';

import { Typography } from '../../components/Topography/topography';
import { formatDate } from '../../utils/Helpers';
import { Avatar, AvatarGroup } from '@mui/material';
import StyledButton from '../../components/Button/StyledButton';
import { ThemeType } from '../../Theme/theme';
import { TypographyTypes } from '../../components/Topography/TypographyTypes';

interface SingleBetRowProps {
  bet?: Bet;
  backgroundColor?: string;
  type?: 'bet' | 'supervisor' | 'ongoing';
}

const SingleBetRow = ({ bet, backgroundColor, type }: SingleBetRowProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <NotificationContainer backgroundColor={backgroundColor}>
      <NotificationHeader>
        {type === 'bet' && <BetIcon />}
        {type === 'supervisor' && <SupervisorIcon />}
        <NotificationTextHeader>
          <Typography value={'משחק שחמט בין דני ליוסי'} variant={TypographyTypes.H3} />
          <Typography
            value={'תיאור עד שורה ואז 3 נקודות כמו כאן...'}
            variant={TypographyTypes.TextMedium}
          />
        </NotificationTextHeader>
      </NotificationHeader>
      <NotificationRow>
        <Tag background="#CEEFEA">
          <Typography value={formatDate(new Date())} variant={TypographyTypes.TextMedium} />
        </Tag>
        <Tag background="#CEEFEA">
          <BetimIcon />
          <Typography value={'25'} variant={TypographyTypes.TextMedium} />
        </Tag>
        <StyledAvatarGroup max={6} spacing="small">
          <Avatar alt="Travis Howard" sx={{ width: 24, height: 24 }} />
          <Avatar alt="Cindy Baker" sx={{ width: 24, height: 24 }} />
          <Avatar alt="Travis Howard" sx={{ width: 24, height: 24 }} />
        </StyledAvatarGroup>
      </NotificationRow>
      {type !== 'ongoing' && (
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
