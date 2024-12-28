// SingleBet.tsx
import { Bet, TagText, User } from "../../api/interfaces";
import Tag from "../../components/Tag/Tag";
import { Typography } from "../../components/Topography/topography";
import { TypographyTypes } from "../../Theme/Typography/typography";
import Circle from "../../components/Circle/CircleComponent";
import { AvatarsDiv, BetRow, DescriptionDiv } from "./SingleBet.styles";

interface SingleBetProp {
  bet: Bet;
}

const SingleBet = ({ bet }: SingleBetProp): JSX.Element => {
  const participantsNumber = 3;

  const renderCircles = () => {
    const circles = [];
    for (let i = 0; i < Math.min(participantsNumber, 3); i++) {
      circles.push(
        <Circle key={i} index={i} participantsNumber={participantsNumber} />
      );
    }
    return circles;
  };

  return (
    <BetRow>
      <AvatarsDiv>{renderCircles()}</AvatarsDiv>
      <DescriptionDiv>
        <Typography value={bet.name} variant={TypographyTypes.H4} />
        <Typography
          value={`נפתח ב: ${bet.createdAt}`}
          variant={TypographyTypes.H5}
        />
        <Typography
          value={
            bet.participants
              ? bet.participants
                  .map(
                    (participant: User) => participant.fullName?.split(" ")[0]
                  ) 
                  .join(", ") 
              : bet.group?.groupName ?? ""
          }
          variant={TypographyTypes.H5}
        />
      </DescriptionDiv>
      <Tag value={TagText[bet.risk]} type={bet.risk} />
    </BetRow>
  );
};

export default SingleBet;
