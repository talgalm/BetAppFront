import { BetNameDiv, ButtonsDiv, LogoDiv, OverlayContainer } from './SuccessfullNewBet.styles';
import { ReactComponent as LogoBright } from '../../Theme/Icons/LogoWhite.svg';
import { Typography } from '../../components/Topography/topography';
import { TypographyTypes } from '../../Theme/Typography/typography';
import { TEXT_SEC_COLOR } from '../../Theme/ColorTheme';
import { User } from '../../api/interfaces';
import { ReactComponent as AddIcon } from '../../Theme/Icons/Minus.svg';

import { AddParticipantTag } from '../../components/Inputs/InputWithPoints/InputWithPoints.styles';
import { StyledButton } from '../NewBet/NewBet.styles';
import { useAtom } from 'jotai';
import { layoutAtom } from '../../Jotai/atoms';
import { HeaderStyle, FooterStyle } from '../../Theme/ThemeInterfaces';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SuccessfullNewBetLink from '../SuccessfullNewBetLink/SuccessfullNewBetLink';
import { ParticipantsDiv } from '../SuccessfullNewBetRisk/SuccessfullNewBetRisk.styles';
import SuccessfullNewBetRisk from '../SuccessfullNewBetRisk/SuccessfullNewBetRisk';

interface SuccessfullNewBetProps {
  isAddToCalendar: boolean;
}

const SuccessfullNewBet = ({ isAddToCalendar }: SuccessfullNewBetProps) => {
  const [, setLayout] = useAtom(layoutAtom);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleBackIconClick = () => {
    setLayout({
      headerStyle: HeaderStyle.PRIMARY_EXPAND,
      footerStyle: FooterStyle.SHOW,
    });
    console.log(isAddToCalendar);
    navigate('/');
  };

  // if (false) {
  //   return <BetLoader />;
  // }

  const betName = 'שם ההתערבות';
  const users: User[] = [
    {
      username: 'TalG',
      fullName: 'טל גלמור',
      image: undefined,
    },
    {
      username: 'Vlad',
      image: undefined,
    },
    {
      username: 'Vlad',
      image: undefined,
    },
  ];

  return (
    <OverlayContainer>
      <LogoDiv>
        <LogoBright width={56} height={24} />
      </LogoDiv>
      <BetNameDiv>
        <Typography
          value={`${t('SuccessfullNewBet.NewBetNameMsg')} \n${betName}`}
          variant={TypographyTypes.H2}
          styleProps={{
            color: TEXT_SEC_COLOR,
          }}
        />
      </BetNameDiv>
      <ParticipantsDiv>
        <Typography
          value={t('SuccessfullNewBet.ParticipantsSendToMsg')}
          variant={TypographyTypes.H3}
          styleProps={{
            color: TEXT_SEC_COLOR,
          }}
        />
        {users.map((user, index) => (
          <AddParticipantTag key={index}>
            <AddIcon />
            <Typography value={user.fullName || user.username} variant={TypographyTypes.H4} />
          </AddParticipantTag>
        ))}
      </ParticipantsDiv>
      <SuccessfullNewBetLink />
      <SuccessfullNewBetRisk />
      <ButtonsDiv>
        <StyledButton onClick={() => handleBackIconClick()}>
          <Typography
            value={t('SuccessfullNewBet.Return')}
            variant={TypographyTypes.H5}
            styleProps={{ color: TEXT_SEC_COLOR }}
          />
        </StyledButton>
      </ButtonsDiv>
    </OverlayContainer>
  );
};
export default SuccessfullNewBet;
