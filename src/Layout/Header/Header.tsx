import { useEffect } from 'react';
import {
  HeaderComponent,
  LeftIconDiv,
  LeftIconNoBack,
  LogoDiv,
  RightIconDiv,
} from './Header.styles';
import { ReactComponent as ReturnArrow } from '../../Theme/Icons/LayoutIcons/ReturnArrow.svg';
import { ReactComponent as HamburgerIcon } from '../../Theme/Icons/LayoutIcons/HamburgerIcon.svg';
import { ReactComponent as BetimIcon } from '../../Theme/Icons/LayoutIcons/BetimHeaderIcon.svg';
import { ReactComponent as CloseIcon } from '../../Theme/Icons/Close.svg';
import { ReactComponent as Logo } from '../../Theme/Icons/Logo.svg';

import { layoutAtom, userAtom } from '../../Jotai/atoms';
import { useAtom } from 'jotai';
import { useIsPrimaryExpand } from '../../utils/Helpers';
import { useUser } from '../../Hooks/useGetUser';
import { UserActiveStep } from '../../Jotai/UserAtoms';
import { useLocation, useNavigate } from 'react-router';

import { authSteps } from '../../pages/WelcomePage/interface';
import { TypographyTypes } from '../../Theme/Typography/typography';
import { Typography } from '../../components/Topography/topography';
import { useTranslation } from 'react-i18next';
import { ActiveStep } from '../../Jotai/newBetAtoms';

const Header = () => {
  const isPrimary = useIsPrimaryExpand();
  const [authStep, setActiveStepAuth] = useAtom(UserActiveStep);
  const [newBetStep, setActiveStepBet] = useAtom(ActiveStep);

  const { t } = useTranslation();
  const [layout] = useAtom(layoutAtom);
  const [user, setUser] = useAtom(userAtom);
  const { data } = useUser(user?.id);
  const path = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  const handleNextStep = () => {
    if (authStep.prev) {
      setActiveStepAuth(authSteps[authStep.prev]);
    }
  };

  const routeToHome = () => {
    localStorage.clear();
    navigate(`/home`);
  };

  const logout = () => {
    localStorage.clear();
    navigate(`/`);
  };

  return (
    <HeaderComponent headerStyle={layout.headerStyle}>
      {authStep.prev && (
        <RightIconDiv onClick={handleNextStep}>
          <ReturnArrow />
        </RightIconDiv>
      )}
      {newBetStep !== null && (
        <LeftIconNoBack onClick={routeToHome}>
          <CloseIcon />
        </LeftIconNoBack>
      )}
      {path.pathname.includes('home') && (
        <>
          <RightIconDiv onClick={logout}>
            <HamburgerIcon />
          </RightIconDiv>
          <LeftIconDiv>
            <BetimIcon />
            <Typography
              value={user.points ?? '00'}
              variant={TypographyTypes.TextSmall}
              styleProps={{ color: '#2A69C6' }}
            />
          </LeftIconDiv>
        </>
      )}
      <LogoDiv>{isPrimary && <Logo />}</LogoDiv>
    </HeaderComponent>
  );
};

export default Header;
