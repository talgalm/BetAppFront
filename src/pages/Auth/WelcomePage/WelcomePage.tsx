import { ButtonsContainer, MainContainer, TextConatiner } from './WelcomePage.styles';
import { ReactComponent as WelcomePageImage } from '../../../Theme/Icons/AuthIcons/WelcomePageImage.svg';
import { ReactComponent as SuccessfulRegisterImage } from '../../../Theme/Icons/AuthIcons/WelcomePageImage2.svg';
import { ReactComponent as SuccessfulChangePasswordImage } from '../../../Theme/Icons/AuthIcons/WelcomePageImage3.svg';
import StyledButton from '../../../components/Button/StyledButton';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { ThemeType } from '../../../Theme/theme';
import { useAtom } from 'jotai';
import { UserActiveStep } from '../../../Jotai/UserAtoms';
import { authSteps, AuthStepValueTypes } from './interface';
import { Typography } from '../../../components/Topography/topography';
import ConnectionOptions from '../ConnectionOptions/ConnectionOptions';
import RegisterForm from '../Register/RegisterForm';
import RegisterProviderForm from '../Register/RegisterProviderForm';
import LoginForm from '../Login/LoginForm';
import ForgotPasswordForm from '../ForgotPassword/ForgotPasswordForm';
import NewPasswordForm from '../NewPassword/NewPasswordForm';
import CodeVerification from '../CodeVerification/CodeVerification';
import { TypographyTypes } from '../../../components/Topography/TypographyTypes';
import ButtonsHub from '../../ButtonsHub';

const WelcomePage = (): JSX.Element => {
  const { t } = useTranslation();
  const [step, setActiveStep] = useAtom(UserActiveStep);

  const handleNextStep = (nextStep: AuthStepValueTypes) => {
    setActiveStep(authSteps[nextStep]);
  };

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
            <ButtonsHub
              textButtonUp={t('WelcomePage.LoginTitle')}
              onClickButtonUp={() => handleNextStep(AuthStepValueTypes.Login)}
              textButtonDown={t('WelcomePage.RegisterTitle')}
              onClickButtonDown={() => handleNextStep(AuthStepValueTypes.RegisterInfo)}
            />
          </ButtonsContainer>
        </>
      )}

      {step.step === AuthStepValueTypes.Login && <LoginForm />}
      {(step.step === AuthStepValueTypes.RegisterInfo ||
        step.step === AuthStepValueTypes.RegisterPassword) && <RegisterForm />}
      {step.step === AuthStepValueTypes.NewPassword && <NewPasswordForm />}
      {step.step === AuthStepValueTypes.VerificationCode && <CodeVerification />}
      {step.step === AuthStepValueTypes.ForgetPassword && <ForgotPasswordForm />}
      {step.step === AuthStepValueTypes.RegisterProvider && <RegisterProviderForm />}
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
          AuthStepValueTypes.Login
        )}
    </MainContainer>
  );
};

export default WelcomePage;
