import BetLoader from '../../Theme/Loader/loader';
import { ButtonsContainer, MainContainer, TextConatiner } from './WelcomePage.styles';
import { ReactComponent as WelcomePageImage } from '../../Theme/Icons/AuthIcons/WelcomePageImage.svg';
import { ReactComponent as SuccessfulRegisterImage } from '../../Theme/Icons/AuthIcons/WelcomePageImage2.svg';
import { ReactComponent as SuccessfulChangePasswordImage } from '../../Theme/Icons/AuthIcons/WelcomePageImage3.svg';
import StyledButton from '../../components/Button/StyledButton';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { ThemeType } from '../../Theme/theme';
import { useAtom } from 'jotai';
import { UserActiveStep } from '../../Jotai/UserAtoms';
import { authSteps, AuthStepValueTypes } from './interface';
import Login from '../Login/Login';
import Register from '../Register/Register';
import ForgetPassword from '../ForgotPassword/ForgotPassword';
import { Typography } from '../../components/Topography/topography';
import { TypographyTypes } from '../../Theme/Typography/typography';
import Home from '../Home/Home';
import { useEffect } from 'react';
import ConnectionOptions from '../ConnectionOptions/ConnectionOptions';
import RegisterForm from '../Register/RegisterForm';

const WelcomePage = (): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [step, setActiveStep] = useAtom(UserActiveStep);

  const handleNextStep = (nextStep: AuthStepValueTypes) => {
    setActiveStep(authSteps[nextStep]);
  };

  // useEffect(() => {
  //   localStorage.clear();
  // }, []);

  const renderSuccessPage = (
    image: JSX.Element,
    titleKey: string,
    subtitleKey: string,
    buttonTextKey: string,
    buttonStep: AuthStepValueTypes
  ) => (
    <>
      <div style={{ marginTop: 50 }}>{image}</div>
      <TextConatiner>
        <Typography value={t(titleKey)} variant={TypographyTypes.H1} />
        <Typography value={t(subtitleKey)} variant={TypographyTypes.H3} />
        <StyledButton
          value={t(buttonTextKey)}
          onClick={() => handleNextStep(buttonStep)}
          styleProps={{ marginTop: 16 }}
        />
      </TextConatiner>
      <ConnectionOptions />
    </>
  );

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
        step.step === AuthStepValueTypes.RegisterPassword ||
        step.step === AuthStepValueTypes.RegisterProvider) && <RegisterForm />}
      {(step.step === AuthStepValueTypes.ForgetPassword ||
        step.step === AuthStepValueTypes.VerificationCode ||
        step.step === AuthStepValueTypes.NewPassword) && <ForgetPassword />}

      {step.step === AuthStepValueTypes.SuccessfulChangePassword &&
        renderSuccessPage(
          <SuccessfulChangePasswordImage />,
          `WelcomePage.${AuthStepValueTypes.SuccessfulChangePassword}Title`,
          `WelcomePage.${AuthStepValueTypes.SuccessfulChangePassword}Subtitle`,
          'WelcomePage.BackToLogin',
          AuthStepValueTypes.RegisterInfo
        )}

      {step.step === AuthStepValueTypes.SuccessfulRegister &&
        renderSuccessPage(
          <SuccessfulRegisterImage />,
          `WelcomePage.${AuthStepValueTypes.SuccessfulRegister}Title`,
          `WelcomePage.${AuthStepValueTypes.SuccessfulRegister}Subtitle`,
          'WelcomePage.BackToLogin',
          AuthStepValueTypes.RegisterInfo
        )}
    </MainContainer>
  );
};

export default WelcomePage;
