import { Bet, TagText, User } from '../../api/interfaces';
import Tag from '../../components/Tag/Tag';
import { Typography } from '../../components/Topography/topography';
import { TypographyTypes } from '../../Theme/Typography/typography';
import Circle from '../../components/Circle/CircleComponent';
import { AvatarsDiv, BetRow, DescriptionDiv } from './SingleBet.styles';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../../utils/Helpers';

interface SingleBetProp {
  bet: Bet;
}

const SingleBet = ({ bet }: SingleBetProp): JSX.Element => {
  const { t } = useTranslation();

  const renderCircles = () => {
    const circles = [];
    for (let i = 0; i < Math.min(bet.userGuesses.length + 1, 3); i++) {
      circles.push(<Circle key={i} index={i} participantsNumber={bet.userGuesses.length + 1} />);
    }
    return circles;
  };

  return (
    <BetRow>
      <AvatarsDiv>{renderCircles()}</AvatarsDiv>
      <DescriptionDiv>
        <Typography value={bet.name} variant={TypographyTypes.H4} />
        <Typography
          value={`${t('MyBets.createdAT')} ${formatDate(bet.createdAt)}`}
          variant={TypographyTypes.H5}
        />
        <Typography
          value={
            bet.userGuesses
              ? bet.userGuesses
                  .map((participant: User) => participant.fullName?.split(' ')[0])
                  .join(', ')
              : (bet.group?.name ?? '')
          }
          variant={TypographyTypes.H5}
        />
      </DescriptionDiv>
      <Tag value={TagText[bet.riskLevel]} type={bet.riskLevel} />
    </BetRow>
  );
};

export default SingleBet;
