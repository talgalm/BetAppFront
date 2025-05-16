import {
  ComplexContainer,
  HomeDivContainer,
  NotificationContainer,
  NotificationCubeContainer,
  NotificationNumber,
  BetsContainer,
} from './Home.styles';
import { useTranslation } from 'react-i18next';
import { Typography } from '../../components/Topography/topography';
import StyledButton from '../../components/Button/StyledButton';
import { ThemeType } from '../../Theme/theme';
import { ReactComponent as HistoryIcon } from '../../Theme/Icons/HomeIcons/HistoryIcon.svg';
import { ReactComponent as SupervisorIcon } from '../../Theme/Icons/HomeIcons/Supervisor.svg';
import { ReactComponent as BetsIcon } from '../../Theme/Icons/HomeIcons/BetsIcon.svg';
import SingleBetRow from './SingleBetRow';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from '../../Jotai/atoms';
import { TypographyTypes } from '../../components/Topography/TypographyTypes';
import { ActiveStep } from '../../Jotai/newBetAtoms';
import { newBetSteps, NewBetStepValueTypes } from '../NewBet/Interface';
import { NotificationColors } from './Colors';
import { Bet, BetStatus } from '../../Interfaces';
import StyledSwitch from '../../components/Switch/Switch';

const Home = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [user] = useAtom(userAtom);
  const [, setActiveStep] = useAtom(ActiveStep);

  const createBetRoute = () => {
    setActiveStep(newBetSteps[NewBetStepValueTypes.Start]);
    navigate(`/new-bet`);
  };

  return (
    <HomeDivContainer>
      <ComplexContainer>
        <Typography
          value={t('Home.Hi', { name: user?.fullName?.split(' ')[0] })}
          variant={TypographyTypes.H1}
        />
        <Typography value={t('Home.Subtitle')} variant={TypographyTypes.TextBig} />
        <NotificationContainer>
          <NotificationCubeContainer backgroundColor={NotificationColors.BetBackground}>
            <NotificationNumber backgroundColor={NotificationColors.BetAccent}>
              <Typography value={'+2'} variant={TypographyTypes.VerySmall} />
            </NotificationNumber>
            <BetsIcon />
            <Typography
              value={user?.bets?.filter((bet) => bet.status === BetStatus.ACTIVE).length}
              variant={TypographyTypes.H1}
              styleProps={{ color: NotificationColors.BetAccent }}
            />
          </NotificationCubeContainer>
          <NotificationCubeContainer backgroundColor={NotificationColors.SupervisorBackground}>
            <NotificationNumber backgroundColor={NotificationColors.SupervisorAccent}>
              <Typography value={'+2'} variant={TypographyTypes.VerySmall} />
            </NotificationNumber>
            <SupervisorIcon />
            <Typography
              value={user?.bets?.filter((bet) => bet.isSupervisor).length}
              variant={TypographyTypes.H1}
              styleProps={{ color: NotificationColors.SupervisorAccent }}
            />
          </NotificationCubeContainer>
          <NotificationCubeContainer backgroundColor={NotificationColors.HistoryBackground}>
            <NotificationNumber backgroundColor={NotificationColors.HistoryAccent}>
              <Typography value={'+2'} variant={TypographyTypes.VerySmall} />
            </NotificationNumber>
            <HistoryIcon />
            <Typography
              value={user?.bets?.filter((bet) => bet.status === BetStatus.COMPLETED).length}
              variant={TypographyTypes.H1}
              styleProps={{ color: NotificationColors.HistoryAccent }}
            />
          </NotificationCubeContainer>
        </NotificationContainer>
        <StyledButton
          value={t('Home.CreateNewBet')}
          colorVariant={ThemeType.Primary}
          onClick={createBetRoute}
        />
      </ComplexContainer>
      <BetsContainer>
        <Typography value={t('Home.Bets')} variant={TypographyTypes.TextBig} />
        {user?.bets &&
          user.bets.map((bet: Bet) => <SingleBetRow key={bet.id} bet={bet} type={bet.status} />)}
      </BetsContainer>
    </HomeDivContainer>
  );
};

export default Home;
