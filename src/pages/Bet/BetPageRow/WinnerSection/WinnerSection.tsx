import { t } from 'i18next';
import { TypographyTypes } from '../../../../components/Topography/TypographyTypes';
import { User } from '../../../../Interfaces';
import {
  SmallAvatar,
  StyledDivider,
} from '../../../NewBet/NewBetComponents/Participants/Participants.styles';
import { Typography } from '../../../../components/Topography/topography';
import { ReactComponent as WinnerIcon } from '../../../../Theme/Icons/Bet/Winner.svg';
import { ReactComponent as WinnerCupIcon } from '../../../../Theme/Icons/Bet/WinnerCup.svg';
import {
  WinnerContainer,
  WinnerContainerWrapper,
  WinnerRow,
  WinnerRowInner,
  WinnerRowInnerSec,
} from './WinnerSection.styles';

const WinnerSection = ({ winners }: { winners: User[] }) => (
  <>
    <WinnerContainerWrapper>
      <WinnerContainer>
        <WinnerIcon />
        <Typography
          value={winners.length === 1 ? t('BetPage.SingleWinner') : t('BetPage.MultiWinner')}
          variant={TypographyTypes.H3}
          styleProps={{ color: '#15AB94' }}
        />
        {winners.map((winner) => (
          <WinnerRow key={winner.id}>
            <WinnerRowInner>
              <SmallAvatar />
              <Typography
                value={winner.fullName}
                variant={TypographyTypes.TextMedium}
                styleProps={{ color: 'black' }}
              />
            </WinnerRowInner>
            <WinnerRowInnerSec>
              <Typography
                value={t('BetPage.betim')}
                variant={TypographyTypes.H2}
                styleProps={{ color: '#D97706' }}
              />
              <Typography
                value={winner.betim}
                variant={TypographyTypes.H2}
                styleProps={{ color: '#D97706' }}
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
