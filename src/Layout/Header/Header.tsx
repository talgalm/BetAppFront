import { useState } from 'react';
import {
  HeaderComponent,
  LeftIconDiv,
  LeftIconNoBack,
  LogoDiv,
  RightIconDiv,
} from './Header.styles';
import { ReactComponent as ReturnArrow } from '../../Theme/Icons/LayoutIcons/ReturnArrow.svg';
import { ReactComponent as HamburgerIcon } from '../../Theme/Icons/LayoutIcons/HamburgerIcon.svg';
import { ReactComponent as CloseIcon } from '../../Theme/Icons/Close.svg';
import { ReactComponent as Logo } from '../../Theme/Icons/Logo.svg';
import { headerAtom } from '../../Jotai/atoms';
import { useAtom } from 'jotai';
import { useIsPrimaryExpand } from '../../utils/Helpers';
import { useLocation } from 'react-router';
import { ActiveStep } from '../../Jotai/newBetAtoms';
import { AreYouSureDialog } from '../../components/AreYouSureDialog/AreYouSureDialog';
import { useProfile } from '../../Providers/useProfile';
import EmailVerificationBanner from './components/EmailVerificationBanner';
import BetimCounter from './components/BetimCounter';
import { useHeaderLogic } from './Hooks/useHeaderLogic';

const Header = () => {
  const isPrimary = useIsPrimaryExpand();
  const [newBetStep] = useAtom(ActiveStep);
  const path = useLocation();
  const [headerStyle] = useAtom(headerAtom);

  const { data: user } = useProfile();
  const [open, setOpen] = useState(false);

  const {
    handleSaveAsDraft,
    handleNextStep,
    handleLogout,
    handleNewBetExit,
    handleConfirmExit,
    handleCancelExit,
  } = useHeaderLogic({
    setOpen,
  });

  return (
    <>
      <HeaderComponent headerStyle={headerStyle}>
        {!path.pathname.includes('home') && !path.pathname.includes('profile') && (
          <RightIconDiv onClick={handleNextStep}>
            <ReturnArrow />
          </RightIconDiv>
        )}
        {newBetStep !== null && (
          <LeftIconNoBack onClick={handleNewBetExit}>
            <CloseIcon />
          </LeftIconNoBack>
        )}
        {(path.pathname.includes('home') || path.pathname.includes('profile')) && (
          <>
            <RightIconDiv onClick={handleLogout}>
              <HamburgerIcon />
            </RightIconDiv>
            <LeftIconDiv>
              <BetimCounter user={user} />
            </LeftIconDiv>
          </>
        )}
        <LogoDiv>{isPrimary && <Logo />}</LogoDiv>
      </HeaderComponent>
      <EmailVerificationBanner user={user} />
      <AreYouSureDialog
        open={open}
        onClose={handleSaveAsDraft}
        onConfirm={handleConfirmExit}
        onAbort={handleCancelExit}
      />
    </>
  );
};

export default Header;
