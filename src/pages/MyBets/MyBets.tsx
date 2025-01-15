import { useState } from "react";
import { Typography } from "../../components/Topography/topography";
import { TypographyTypes } from "../../Theme/Typography/typography";
import {
  InputWrapper,
  MainContainer,
  GrayLine,
  BetsContainer,
  ShowMeMore,
  CollapsibleContainer,
} from "./MyBets.styles";
import { ReactComponent as Search } from "../../Theme/Icons/Search.svg";
import { Bet } from "../../api/interfaces";
import SingleBet from "../SingleBet/SingleBet";
import { talsBets } from "../../Mocks/betsmock";
import { Collapse } from "@mui/material";

const MyBets = (): JSX.Element => {
  const [bets] = useState<Bet[]>(talsBets);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <MainContainer>
      <InputWrapper>
        <Typography value={"ההתערבויות שלי"} variant={TypographyTypes.H3} />
        <Search width="24" height="24" />
      </InputWrapper>
      <GrayLine />
      <CollapsibleContainer>
        <BetsContainer>
          {bets.slice(0, 3).map((bet: Bet, index: number) => (
            <SingleBet bet={bet} key={index} />
          ))}
        </BetsContainer>
        <Collapse in={isExpanded}>
          <BetsContainer>
            {bets.slice(3).map((bet: Bet, index: number) => (
              <SingleBet bet={bet} key={index + 3} />
            ))}
          </BetsContainer>
        </Collapse>
      </CollapsibleContainer>
      {bets.length > 4 && (
        <ShowMeMore onClick={toggleExpand}>
          <Typography
            value={isExpanded ? "הצג פחות" : "תראה לי עוד"}
            variant={TypographyTypes.H4}
          />
        </ShowMeMore>
      )}
    </MainContainer>
  );
};

export default MyBets;
