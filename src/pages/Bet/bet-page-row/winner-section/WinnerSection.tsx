import { t } from 'i18next';
import { TypographyTypes } from '@components/Topography/TypographyTypes';
import { Typography } from '@components/Topography/typography';
import { ReactComponent as WinnerIcon } from '@assets/icons/betIcons/Winner.svg';
import { ReactComponent as WinnerCupIcon } from '@assets/icons/betIcons/WinnerCup.svg';
import { User } from '@interfaces/User.interface';
import {
  WinnerContainer,
  WinnerContainerWrapper,
  WinnerRow,
  WinnerRowInner,
  WinnerRowInnerSec,
} from './WinnerSection.styles';
import {
  SmallAvatar,
  StyledDivider,
} from '@pages/new-bet/new-bet-components/participants-new-bet/Participants.styles';
import { PRIMARY_BLACK, PRIMARY_GREEN, PRIMARY_ORANGE } from '@theme/colorTheme';

const WinnerSection = ({ winners }: { winners: User[] }) => (
  <>
    <WinnerContainerWrapper>
      <WinnerContainer>
        <WinnerIcon />
        <Typography
          value={winners.length === 1 ? t('BetPage.SingleWinner') : t('BetPage.MultiWinner')}
          variant={TypographyTypes.H3}
          styleProps={{ color: PRIMARY_GREEN }}
        />
        {winners.map((winner) => (
          <WinnerRow key={winner.id}>
            <WinnerRowInner>
              <SmallAvatar />
              <Typography
                value={winner.fullName}
                variant={TypographyTypes.TextMedium}
                styleProps={{ color: PRIMARY_BLACK }}
              />
            </WinnerRowInner>
            <WinnerRowInnerSec>
              <Typography
                value={t('BetPage.betim')}
                variant={TypographyTypes.H2}
                styleProps={{ color: PRIMARY_ORANGE }}
              />
              <Typography
                value={winner.betim}
                variant={TypographyTypes.H2}
                styleProps={{ color: PRIMARY_ORANGE }}
              />
              <WinnerCupIcon />
            </WinnerRowInnerSec>
          </WinnerRow>
        ))}
      </WinnerContainer>
    </WinnerContainerWrapper>
    <div style={{ marginBottom: -15 }}>
      <StyledDivider />
    </div>
  </>
);

export default WinnerSection;
