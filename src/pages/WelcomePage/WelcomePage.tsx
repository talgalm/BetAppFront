import BetLoader from '../../Theme/Loader/loader';
import { ButtonsContainer, MainContainer } from './WelcomePage.styles';
import { ReactComponent as WelcomePageImage } from '../../Theme/Icons/WelcomePageImage.svg';
import StyledButton from '../../components/Button/StyledButton';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { ThemeType } from '../../Theme/theme';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { UserActiveStep } from '../../Jotai/UserAtoms';
import { authSteps, AuthStepValueTypes } from './interface';
import Login from '../Login/Login';
import Register from '../Register/Register';
import ForgetPassword from '../ForgotPassword/ForgotPassword';

const WelcomePage = (): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [step, setActiveStep] = useAtom(UserActiveStep);

  // eslint-disable-next-line no-constant-condition
  if (false) {
    return <BetLoader />;
  }

  const handleNextStep = (nextStep: AuthStepValueTypes) => {
    setActiveStep(authSteps[nextStep]);
  };

  return (
    <MainContainer>
      {step.step === AuthStepValueTypes.Welcome && (
        <>
          <div style={{ marginTop: 50 }}>
            <WelcomePageImage />
          </div>
          <ButtonsContainer>
            <StyledButton
              value={t('WelcomePage.LoginTitle')}
              colorVariant={ThemeType.Primary}
              onClick={() => handleNextStep(AuthStepValueTypes.Login)}
            />
            <StyledButton
              value={t('WelcomePage.RegisterTitle')}
              colorVariant={ThemeType.Secondary}
              onClick={() => handleNextStep(AuthStepValueTypes.RegisterInfo)}
            />
          </ButtonsContainer>
        </>
      )}
      {step.step === AuthStepValueTypes.Login && <Login />}
      {(step.step === AuthStepValueTypes.RegisterInfo ||
        step.step === AuthStepValueTypes.RegisterPassword) && <Register />}
      {step.step === AuthStepValueTypes.ForgetPassword && <ForgetPassword />}
    </MainContainer>
  );
};

export default WelcomePage;
