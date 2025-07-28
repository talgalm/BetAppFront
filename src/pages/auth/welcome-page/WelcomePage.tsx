import { ButtonsContainer, MainContainer, TextConatiner } from './WelcomePage.styles';
import { ReactComponent as WelcomePageImage } from '@assets/icons/authIcons/WelcomePageImage.svg';
import { ReactComponent as SuccessfulRegisterImage } from '@assets/icons/authIcons/WelcomePageImage2.svg';
import { ReactComponent as SuccessfulChangePasswordImage } from '@assets/icons/authIcons/WelcomePageImage3.svg';
import StyledButton, { ButtonConfig } from '@components/Button/StyledButton';
import { useTranslation } from 'react-i18next';
import { ThemeType } from '@theme/theme';
import { useAtom } from 'jotai';
import { UserActiveStep } from '@store/authStepAtom';
import { authSteps, AuthStepValueTypes } from './auth-steps';
import { Typography } from '@components/Topography/typography';
import ConnectionOptions from '../connection-options/ConnectionOptions';
import RegisterForm from '../register/RegisterForm';
import RegisterProviderForm from '../register/RegisterProviderForm';
import LoginForm from '../login/LoginForm';
import ForgotPasswordForm from '../forgot-password/ForgotPasswordForm';
import NewPasswordForm from '../new-password/NewPasswordForm';
import CodeVerification from '../code-verification/CodeVerification';
import { TypographyTypes } from '@components/Topography/TypographyTypes';
import ButtonsHub from '../../../components/ButtonsHub/ButtonsHub';

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

  const pickContacts = async () => {
    try {
      if ('contacts' in navigator && 'ContactsManager' in window) {
        const contacts = await (navigator as any).contacts.select(['name', 'tel'], {
          multiple: true,
        });
        console.log(contacts);
      } else {
        alert('Contact Picker API not supported on this device/browser.');
      }
    } catch (err) {
      console.error('Error picking contacts:', err);
    }
  };

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
          <button onClick={pickContacts}>Pick Contact</button>
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
