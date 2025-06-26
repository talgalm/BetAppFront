import {
  ComplexContainer,
  HomeDivContainer,
  NotificationContainer,
  NotificationCubeContainer,
  NotificationNumber,
  BetsContainer,
  NoBetsContainer,
  IconContainer,
} from './Home.styles';
import { useTranslation } from 'react-i18next';
import { Typography } from '@components/Topography/typography';
import StyledButton from '@components/Button/StyledButton';
import { ThemeType } from '../../Theme/theme';
import { ReactComponent as HistoryIcon } from '../../Theme/Icons/HomeIcons/HistoryIcon.svg';
import { ReactComponent as SupervisorIcon } from '../../Theme/Icons/HomeIcons/Supervisor.svg';
import { ReactComponent as BetsIcon } from '../../Theme/Icons/HomeIcons/BetsIcon.svg';
import { ReactComponent as NoBetsIcon } from '../../Theme/Icons/HomeIcons/NoBetsIcon.svg';
import SingleBetRow from './SingleBetRow';
import { useLocation, useNavigate } from 'react-router-dom';
import { TypographyTypes } from '@components/Topography/TypographyTypes';
import { ActiveStep } from '../../Jotai/newBetAtoms';
import { newBetSteps, NewBetStepValueTypes } from '../NewBet/new-bet-steps';
import { NotificationColors } from './Colors';
import { useEffect } from 'react';
import { useProfile } from '../../Providers/useProfile';
import BetLoader from '../../Theme/Loader/loader';
import { useAtom } from 'jotai';
import { useSocketUpdates } from '@connection/useSocketUpdates';
import { BetStatus, Bet } from '@interfaces/Bet.interface';

const Home = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [, setActiveStep] = useAtom(ActiveStep);

  useSocketUpdates();

  const { data: profile, isLoading } = useProfile();

  const location = useLocation();
  const cameFromCleanup = location.state?.fromNewBetCleanup;

  useEffect(() => {
    if (cameFromCleanup) {
      window.history.replaceState(null, document.title);
    }
  }, [cameFromCleanup]);

  if (isLoading || !profile) {
    return <BetLoader />;
  }

  const firstName = profile.fullName?.split(' ')[0] ?? '';
  const activeBetsCount = profile.bets.filter((b) => b.status === BetStatus.ACTIVE).length;
  const supervisorCount = profile.bets.filter((b) => b.isSupervisor).length;
  const completedBetsCount = profile.bets.filter((b) => b.status === BetStatus.COMPLETED).length;

  const createBetRoute = () => {
    setActiveStep(newBetSteps[NewBetStepValueTypes.Start]);
    navigate('/new-bet');
  };

  return (
    <HomeDivContainer>
      {profile.bets.length === 0 ? (
        <>
          <ComplexContainer>
            <Typography value={t('Home.Hi', { name: firstName })} variant={TypographyTypes.H3} />
            <Typography value={t('Home.Subtitle')} variant={TypographyTypes.TextBig} />
            <StyledButton
              value={t('Home.CreateNewBet')}
              colorVariant={ThemeType.Primary}
              onClick={createBetRoute}
            />
          </ComplexContainer>
          <NoBetsContainer>
            <IconContainer>
              <NoBetsIcon />
            </IconContainer>
            <Typography value={t('Home.NoBetsTitle')} variant={TypographyTypes.H3} />
            <Typography value={t('Home.NoBetsSubTitle')} variant={TypographyTypes.TextBig} />
          </NoBetsContainer>
        </>
      ) : (
        <>
          <ComplexContainer>
            <Typography value={t('Home.Hi', { name: firstName })} variant={TypographyTypes.H1} />
            <Typography value={t('Home.Subtitle')} variant={TypographyTypes.TextBig} />

            <NotificationContainer>
              <NotificationCube
                icon={<BetsIcon />}
                value={activeBetsCount}
                bg={NotificationColors.BetBackground}
                accent={NotificationColors.BetAccent}
              />
              <NotificationCube
                icon={<SupervisorIcon />}
                value={supervisorCount}
                bg={NotificationColors.SupervisorBackground}
                accent={NotificationColors.SupervisorAccent}
              />
              <NotificationCube
                icon={<HistoryIcon />}
                value={completedBetsCount}
                bg={NotificationColors.HistoryBackground}
                accent={NotificationColors.HistoryAccent}
              />
            </NotificationContainer>

            <StyledButton
              value={t('Home.CreateNewBet')}
              colorVariant={ThemeType.Primary}
              onClick={createBetRoute}
            />
          </ComplexContainer>
          <BetsContainer>
            <Typography value={t('Home.Bets')} variant={TypographyTypes.TextBig} />
            {profile.bets.map((bet: Bet) => (
              <SingleBetRow key={bet.id} bet={bet} isSupervisor={bet.isSupervisor} />
            ))}
          </BetsContainer>
        </>
      )}
    </HomeDivContainer>
  );
};

export default Home;

interface CubeProps {
  icon: React.ReactElement;
  value: number;
  bg: string;
  accent: string;
}
const NotificationCube = ({ icon, value, bg, accent }: CubeProps) => (
  <NotificationCubeContainer backgroundColor={bg}>
    <NotificationNumber backgroundColor={accent}>
      {/* You had a hard‑coded "+2" badge; replace or remove as needed */}
      <Typography value="+2" variant={TypographyTypes.VerySmall} />
    </NotificationNumber>
    {icon}
    <Typography value={value} variant={TypographyTypes.H1} styleProps={{ color: accent }} />
  </NotificationCubeContainer>
);
