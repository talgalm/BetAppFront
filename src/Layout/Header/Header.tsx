import { useEffect, useState } from 'react';
import {
  HeaderComponent,
  LeftIconDiv,
  LeftIconNoBack,
  LogoDiv,
  RightIconDiv,
  VerificationContainer,
} from './Header.styles';
import { ReactComponent as ReturnArrow } from '../../Theme/Icons/LayoutIcons/ReturnArrow.svg';
import { ReactComponent as HamburgerIcon } from '../../Theme/Icons/LayoutIcons/HamburgerIcon.svg';
import { ReactComponent as BetimIcon } from '../../Theme/Icons/LayoutIcons/BetimHeaderIcon.svg';
import { ReactComponent as CloseIcon } from '../../Theme/Icons/Close.svg';
import { ReactComponent as RedCloseIcon } from '../../Theme/Icons/LayoutIcons/RedClose.svg';
import { ReactComponent as Logo } from '../../Theme/Icons/Logo.svg';
import { layoutAtom, userAtom } from '../../Jotai/atoms';
import { useAtom } from 'jotai';
import { useIsPrimaryExpand } from '../../utils/Helpers';
import { UserActiveStep } from '../../Jotai/UserAtoms';
import { useLocation, useNavigate } from 'react-router';

import { authSteps } from '../../pages/Auth/WelcomePage/interface';
import { Typography } from '../../components/Topography/topography';
import { useTranslation } from 'react-i18next';
import { ActiveStep } from '../../Jotai/newBetAtoms';
import { useLogout } from '../../pages/Auth/Hooks/useLogout';
import { TypographyTypes } from '../../components/Topography/TypographyTypes';

const Header = () => {
  const isPrimary = useIsPrimaryExpand();
  const [authStep, setActiveStepAuth] = useAtom(UserActiveStep);
  const [newBetStep] = useAtom(ActiveStep);
  const [verify, setVerify] = useState(false);
  const path = useLocation();

  const [value, setValue] = useState(200);
  const [downValue, setDownValue] = useState(100);

  const { t } = useTranslation();
  const [layout] = useAtom(layoutAtom);
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();
  const { mutate } = useLogout();

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
    mutate();
  };

  useEffect(() => {
    if (user?.verifyEmail === false) {
      const dismissed = sessionStorage.getItem('verifyDismissed');
      setVerify(dismissed !== 'true');
    }
  }, [user]);

  const handleDismiss = () => {
    setVerify(false);
    sessionStorage.setItem('verifyDismissed', 'true');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setValue((prevValue) => {
          if (prevValue <= downValue) {
            clearInterval(interval);
            return downValue;
          }
          return prevValue - 1;
        });
      }, 50); // adjust speed of decrementing (50ms for smooth animation)
    }, 1000); // wait 2 seconds before starting the countdown

    return () => clearTimeout(timer); // clean up on component unmount
  }, [downValue]);

  return (
    <>
      <HeaderComponent headerStyle={layout.headerStyle}>
        {authStep.step !== 'Welcome' && !path.pathname.includes('home') && (
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
                value={value}
                variant={TypographyTypes.TextSmall}
                styleProps={{ color: '#2A69C6' }}
              />
            </LeftIconDiv>
          </>
        )}
        <LogoDiv>{isPrimary && <Logo />}</LogoDiv>
      </HeaderComponent>
      {user && verify && user?.verifyEmail === false && (
        <VerificationContainer>
          <Typography
            value={`שלחנו לך קוד אימות למייל ${user.email}`}
            variant={TypographyTypes.TextSmall}
            styleProps={{ color: '#DA3E3E' }}
          />
          <RedCloseIcon onClick={handleDismiss} />
        </VerificationContainer>
      )}
    </>
  );
};

export default Header;
