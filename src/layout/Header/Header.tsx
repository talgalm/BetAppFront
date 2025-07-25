import { useState } from 'react';
import {
  HeaderComponent,
  HeaderInnerContainer,
  LeftIconDiv,
  LeftIconNoBack,
  LogoDiv,
  RightIconDiv,
} from './Header.styles';
import { ReactComponent as ReturnArrow } from '@assets/icons/layoutIcons/ReturnArrow.svg';
import { ReactComponent as HamburgerIcon } from '@assets/icons/layoutIcons/HamburgerIcon.svg';
import { ReactComponent as CloseIcon } from '@assets/icons/Close.svg';
import { ReactComponent as Logo } from '@assets/icons/Logo.svg';
import { useAtom } from 'jotai';
import { useIsPrimaryExpand } from '@utils/Helpers';
import { useLocation } from 'react-router';
import { ActiveStep } from '@store/newBetStepAtom';
import { DialogType, StyledDialog } from '@components/StyledDialog/StyledDialog';
import { useProfile } from '@providers/useProfile';
import EmailVerificationBanner from './components/EmailVerificationBanner';
import BetimCounter from './components/BetimCounter';
import { useHeaderLogic } from './Hooks/useHeaderLogic';
import { createDialogButtons } from './buttons';
import { contactModalDialogAtom } from '@store/dialogAtoms';
import { headerAtom } from '@store/layoutAtoms';

const Header = () => {
  const isPrimary = useIsPrimaryExpand();
  const [newBetStep] = useAtom(ActiveStep);
  const path = useLocation();
  const [headerStyle] = useAtom(headerAtom);
  const [contactDialog] = useAtom(contactModalDialogAtom);

  const { data: user } = useProfile();
  const [open, setOpen] = useState(false);

  const {
    handleSaveAsDraft,
    handleNextStep,
    handleNewBetExit,
    handleConfirmExit,
    handleCancelExit,
  } = useHeaderLogic({
    setOpen,
  });

  const dialogButtons = createDialogButtons(
    DialogType.BetCreation,
    handleConfirmExit,
    handleSaveAsDraft
  );

  return (
    <>
      <HeaderComponent headerStyle={headerStyle}>
        <HeaderInnerContainer>
          {!path.pathname.includes('home') && !path.pathname.includes('profile') && (
            <RightIconDiv onClick={handleNextStep}>
              <ReturnArrow />
            </RightIconDiv>
          )}
          {(newBetStep !== null || contactDialog) && (
            <LeftIconNoBack onClick={handleNewBetExit}>
              <CloseIcon />
            </LeftIconNoBack>
          )}
          {path.pathname !== '/' && (
            <LeftIconDiv>
              <BetimCounter user={user} />
            </LeftIconDiv>
          )}
          <LogoDiv>{isPrimary && <Logo />}</LogoDiv>
        </HeaderInnerContainer>
      </HeaderComponent>
      <EmailVerificationBanner user={user} />
      <StyledDialog
        open={open}
        type={DialogType.BetCreation}
        closeModal={handleCancelExit}
        buttons={dialogButtons}
      />
    </>
  );
};

export default Header;
