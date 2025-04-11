import { useEffect } from 'react';
import { HeaderComponent, LogoDiv, ReturnArrowDiv } from './Header.styles';
import { ReactComponent as ReturnArrow } from '../../Theme/Icons/LayoutIcons/ReturnArrow.svg';
import { ReactComponent as Logo } from '../../Theme/Icons/Logo.svg';

import { layoutAtom, userAtom } from '../../Jotai/atoms';
import { useAtom } from 'jotai';
import { FooterStyle, HeaderStyle } from '../../Theme/ThemeInterfaces';
import { useNavigate } from 'react-router-dom';
import { useIsPrimaryExpand } from '../../utils/Helpers';
import { useTranslation } from 'react-i18next';
import { UseUser } from '../../Hooks/useGetUser';
import { UserActiveStep } from '../../Jotai/UserAtoms';
import { authSteps, AuthStepValueTypes } from '../../pages/WelcomePage/interface';

const Header = () => {
  const isPrimary = useIsPrimaryExpand();
  const [step, setActiveStep] = useAtom(UserActiveStep);
  const [layout, setLayout] = useAtom(layoutAtom);
  const [user, setUser] = useAtom(userAtom);
  const { data } = UseUser(user?.id);

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  const handleNextStep = () => {
    if (step.prev) {
      setActiveStep(authSteps[step.prev]);
    }
  };

  return (
    <HeaderComponent headerStyle={layout.headerStyle}>
      {step.step !== AuthStepValueTypes.Welcome && (
        <ReturnArrowDiv onClick={handleNextStep}>
          <ReturnArrow />
        </ReturnArrowDiv>
      )}
      <LogoDiv>{isPrimary && <Logo />}</LogoDiv>
    </HeaderComponent>
  );
};

export default Header;
