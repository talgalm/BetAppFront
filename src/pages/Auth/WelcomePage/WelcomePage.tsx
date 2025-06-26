import { ButtonsContainer, MainContainer, TextConatiner } from './WelcomePage.styles';
import { ReactComponent as WelcomePageImage } from '@assets/icons/authIcons/WelcomePageImage.svg';
import { ReactComponent as SuccessfulRegisterImage } from '@assets/icons/authIcons/WelcomePageImage2.svg';
import { ReactComponent as SuccessfulChangePasswordImage } from '@assets/icons/authIcons/WelcomePageImage3.svg';
import StyledButton, { ButtonConfig } from '@components/Button/StyledButton';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { ThemeType } from '@theme/theme';
import { useAtom } from 'jotai';
import { UserActiveStep } from '@store/authStepAtom';
import { authSteps, AuthStepValueTypes } from './auth-steps';
import { Typography } from '@components/Topography/typography';
import ConnectionOptions from '../ConnectionOptions/ConnectionOptions';
import RegisterForm from '../Register/RegisterForm';
import RegisterProviderForm from '../Register/RegisterProviderForm';
import LoginForm from '../Login/LoginForm';
import ForgotPasswordForm from '../ForgotPassword/ForgotPasswordForm';
import NewPasswordForm from '../NewPassword/NewPasswordForm';
import CodeVerification from '../CodeVerification/CodeVerification';
import { TypographyTypes } from '@components/Topography/TypographyTypes';
import ButtonsHub from '../../ButtonsHub';

const WelcomePage = (): JSX.Element => {
  const { t } = useTranslation();
  const [step, setActiveStep] = useAtom(UserActiveStep);

  const handleNextStep = (nextStep: AuthStepValueTypes) => {
    setActiveStep(authSteps[nextStep]);
  };

  const buttons: ButtonConfig[] = [
    {
      value: t('WelcomePage.LoginTitle'),
      onClick: () => handleNextStep(AuthStepValueTypes.Login),
      colorVariant: ThemeType.Primary,
    },
    {
      value: t('WelcomePage.RegisterTitle'),
      onClick: () => handleNextStep(AuthStepValueTypes.RegisterInfo),
      colorVariant: ThemeType.Secondary,
    },
  ];

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
            <ButtonsHub buttons={buttons} />
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
