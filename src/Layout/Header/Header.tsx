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
import { useUser } from '../../Hooks/hookQuery/useGetUser';
import { UserActiveStep } from '../../Jotai/UserAtoms';
import { useLocation, useNavigate } from 'react-router';

import { authSteps } from '../../pages/Auth/WelcomePage/interface';
import { TypographyTypes } from '../../Theme/Typography/typography';
import { Typography } from '../../components/Topography/topography';
import { useTranslation } from 'react-i18next';
import { ActiveStep } from '../../Jotai/newBetAtoms';

const Header = () => {
  const isPrimary = useIsPrimaryExpand();
  const [authStep, setActiveStepAuth] = useAtom(UserActiveStep);
  const [newBetStep] = useAtom(ActiveStep);
  const [verify, setVerify] = useState(true); // fix here

  const { t } = useTranslation();
  const [layout] = useAtom(layoutAtom);
  const [user, setUser] = useAtom(userAtom);
  const { data } = useUser(user?.id);
  const path = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
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
    <>
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
      {!verify && (
        <VerificationContainer>
          <Typography
            value={'שלחנו לך קוד אימות למייל morgaltal@gmail.com'}
            variant={TypographyTypes.TextSmall}
            styleProps={{ color: '#DA3E3E' }}
          />
          <RedCloseIcon onClick={() => setVerify(true)} />
        </VerificationContainer>
      )}
    </>
  );
};

export default Header;
