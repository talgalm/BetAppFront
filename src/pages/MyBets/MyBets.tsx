import { useState } from 'react';
import { Typography } from '../../components/Topography/topography';
import { TypographyTypes } from '../../Theme/Typography/typography';
import {
  InputWrapper,
  MainContainer,
  GrayLine,
  BetsContainer,
  ShowMeMore,
  CollapsibleContainer,
} from './MyBets.styles';
import { ReactComponent as Search } from '../../Theme/Icons/Search.svg';
import { Bet } from '../../api/interfaces';
import SingleBet from '../SingleBet/SingleBet';
// import { talsBets } from '../../Mocks/betsmock';
import { Collapse } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface MyBetsProps {
  userBets: Bet[];
}

const MyBets = ({ userBets }: MyBetsProps): JSX.Element => {
  // const [bets] = useState<Bet[]>(talsBets);
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation();
  // const [username] = useState('TalG');

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <MainContainer>
      <InputWrapper>
        <Typography value={t('MyBets.title')} variant={TypographyTypes.H3} />
        <Search />
      </InputWrapper>
      <GrayLine />
      <CollapsibleContainer>
        <BetsContainer>
          {userBets &&
            userBets
              .slice(0, 3)
              .map((bet: Bet, index: number) => <SingleBet bet={bet} key={index} />)}
        </BetsContainer>
        <Collapse in={isExpanded}>
          <BetsContainer>
            {userBets &&
              userBets
                .slice(3)
                .map((bet: Bet, index: number) => <SingleBet bet={bet} key={index + 3} />)}
          </BetsContainer>
        </Collapse>
      </CollapsibleContainer>
      {userBets && userBets.length > 4 && (
        <ShowMeMore onClick={toggleExpand}>
          <Typography
            value={isExpanded ? t('MyBets.showMore') : t('MyBets.showless')}
            variant={TypographyTypes.H4}
          />
        </ShowMeMore>
      )}
    </MainContainer>
  );
};

export default MyBets;
