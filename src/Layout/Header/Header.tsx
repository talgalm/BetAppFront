import { useEffect, useRef, useState } from 'react';
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
import { finishBetAtom, layoutAtom, layoutEphemeralAtom } from '../../Jotai/atoms';
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
import { useCleanCreateNewBet } from '../../utils/cleanCreateNewBet';
import { AreYouSureDialog } from '../../components/AreYouSureDialog/AreYouSureDialog';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { User } from '../../Interfaces';
import { useProfile } from '../../Providers/useProfile';

const Header = () => {
  const isPrimary = useIsPrimaryExpand();
  const [authStep, setActiveStepAuth] = useAtom(UserActiveStep);
  const [newBetStep] = useAtom(ActiveStep);
  const [verify, setVerify] = useState(false);
  const path = useLocation();

  const [downValue, setDownValue] = useState(100);
  const cleanNewBet = useCleanCreateNewBet();

  const { t } = useTranslation();
  const [layout] = useAtom(layoutAtom);
  const [layoutEphemeral, setLayout] = useAtom(layoutEphemeralAtom);
  const { data: user } = useProfile();
  const [animatedBetim, setAnimatedBetim] = useState<number | undefined>(user?.betim);
  const previousBetimRef = useRef<number | undefined>(user?.betim);
  const { mutate } = useLogout();
  const navigate = useNavigate();
  const [finishBet, SetFinishBet] = useAtom(finishBetAtom);

  const handleNextStep = () => {
    if (authStep.prev) {
      setActiveStepAuth(authSteps[authStep.prev]);
    } else if (finishBet) {
      SetFinishBet(null);
    } else {
      navigate('/home');
    }
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
    if (user?.betim !== undefined && previousBetimRef.current !== undefined) {
      if (user.betim < previousBetimRef.current) {
        const diff = previousBetimRef.current - user.betim;
        const duration = 1000;
        const steps = 30;
        const stepTime = duration / steps;
        const decrement = diff / steps;

        let current = previousBetimRef.current;
        let count = 0;

        const interval = setInterval(() => {
          count++;
          current -= decrement;
          setAnimatedBetim(Math.round(current));

          if (count >= steps) {
            clearInterval(interval);
            setAnimatedBetim(user.betim);
          }
        }, stepTime);
      } else {
        setAnimatedBetim(user.betim);
      }
    }

    previousBetimRef.current = user?.betim;
  }, [user?.betim]);

  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    cleanNewBet();
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSaveAsDraft = () => {
    console.log('');
  };

  const handleX = () => {
    if (!layoutEphemeral?.overlay) {
      setOpen(true);
      return;
    }
    layoutEphemeral.overlay();
    setLayout({ overlay: undefined });
  };

  return (
    <>
      <HeaderComponent headerStyle={layout.headerStyle}>
        {!path.pathname.includes('home') && (
          <RightIconDiv onClick={handleNextStep}>
            <ReturnArrow />
          </RightIconDiv>
        )}
        {newBetStep !== null && (
          <LeftIconNoBack onClick={handleX}>
            <CloseIcon />
          </LeftIconNoBack>
        )}
        {(path.pathname.includes('home') || path.pathname.includes('profile')) && (
          <>
            <RightIconDiv onClick={logout}>
              <HamburgerIcon />
            </RightIconDiv>
            <LeftIconDiv>
              <BetimIcon />
              <Typography
                value={animatedBetim}
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
      <AreYouSureDialog
        open={open}
        onClose={handleSaveAsDraft}
        onConfirm={handleConfirm}
        onAbort={handleCancel}
      />
    </>
  );
};

export default Header;
