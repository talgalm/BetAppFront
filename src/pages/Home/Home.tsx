import {
  ComplexContainer,
  HomeDivContainer,
  NotificationContainer,
  NotificationCubeContainer,
  NotificationNumber,
  BetsContainer,
} from './Home.styles';
import BetLoader from '../../Theme/Loader/loader';
import { useEffect } from 'react';
import { UseUser } from '../../Hooks/useGetUser';
import { useAtom } from 'jotai';
import { userAtom } from '../../Jotai/atoms';
import { useTranslation } from 'react-i18next';
import { Typography } from '../../components/Topography/topography';
import { TypographyTypes } from '../../Theme/Typography/typography';
import StyledButton from '../../components/Button/StyledButton';
import { ThemeType } from '../../Theme/theme';
import { ReactComponent as HistoryIcon } from '../../Theme/Icons/HomeIcons/HistoryIcon.svg';
import { ReactComponent as SupervisorIcon } from '../../Theme/Icons/HomeIcons/Supervisor.svg';
import { ReactComponent as BetsIcon } from '../../Theme/Icons/HomeIcons/BetsIcon.svg';
import SingleBetRow from './SingleBetRow';
import { useNavigate } from 'react-router-dom';

const Home = (): JSX.Element => {
  const [user, setUser] = useAtom(userAtom);
  const { data, isLoading } = UseUser(user?.id);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const createBetRoute = () => {
    navigate(`/new-bet`);
  };

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  if (isLoading) {
    return <BetLoader />;
  }

  return (
    <HomeDivContainer>
      <ComplexContainer>
        <Typography value={t('Home.Hi', { name: 'דניאל' })} variant={TypographyTypes.H1} />
        <Typography value={t('Home.Subtitle')} variant={TypographyTypes.TextBig} />
        <NotificationContainer>
          <NotificationCubeContainer backgroundColor="#EFFDF4">
            <NotificationNumber backgroundColor="#15AB94">
              <Typography value={'+2'} variant={TypographyTypes.VerySmall} />
            </NotificationNumber>
            <BetsIcon />
            <Typography value={7} variant={TypographyTypes.H1} styleProps={{ color: '#15AB94' }} />
          </NotificationCubeContainer>
          <NotificationCubeContainer backgroundColor="#FEF3C7">
            <NotificationNumber backgroundColor="#D97706">
              <Typography value={'+2'} variant={TypographyTypes.VerySmall} />
            </NotificationNumber>
            <SupervisorIcon />
            <Typography value={7} variant={TypographyTypes.H1} styleProps={{ color: '#D97706' }} />
          </NotificationCubeContainer>
          <NotificationCubeContainer backgroundColor="#FAE8FF">
            <NotificationNumber backgroundColor="#C026D3">
              <Typography value={'+2'} variant={TypographyTypes.VerySmall} />
            </NotificationNumber>
            <HistoryIcon />
            <Typography value={7} variant={TypographyTypes.H1} styleProps={{ color: '#C026D3' }} />
          </NotificationCubeContainer>
        </NotificationContainer>
        <StyledButton
          value={t('Home.CreateNewBet')}
          colorVariant={ThemeType.Primary}
          onClick={createBetRoute}
        />
      </ComplexContainer>
      <BetsContainer>
        <Typography value={t('Home.Notifications')} variant={TypographyTypes.TextBig} />
        <SingleBetRow backgroundColor="#EFFDF4" type="bet" />
        <SingleBetRow backgroundColor="#FEF3C7" type="supervisor" />
      </BetsContainer>
      <BetsContainer>
        <Typography value={t('Home.OpenBets')} variant={TypographyTypes.TextBig} />
        <SingleBetRow backgroundColor="#fff" type="ongoing" />
      </BetsContainer>
    </HomeDivContainer>
  );
};

export default Home;
