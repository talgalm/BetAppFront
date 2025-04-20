import { useTranslation } from 'react-i18next';
import { Typography } from '../../components/Topography/topography';
import { TypographyTypes } from '../../Theme/Typography/typography';
import {
  AppleIcon,
  BottomContainer,
  ConnectionOptions,
  ConnectionOptionsContainer,
  DividerWithText,
  DontHaveAccountContainer,
  FacebookIcon,
  GoogleIcon,
  HeaderContainer,
  SignInContainer,
} from './Login.styles';
import StyledInput from '../../components/Inputs/StyledInput/StyledInput';
import { ReactComponent as VisableIcon } from '../../Theme/Icons/AuthIcons/isVisibaleIcon.svg';
import { ReactComponent as NotVisiblaeIcon } from '../../Theme/Icons/AuthIcons/notVisibaleIcon.svg';
import { useForm } from 'react-hook-form';
import { LoginFormInput } from './interface';
import { ThemeType } from '../../Theme/theme';
import StyledButton from '../../components/Button/StyledButton';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { UserActiveStep } from '../../Jotai/UserAtoms';
import { authSteps, AuthStepValueTypes } from '../WelcomePage/interface';
import { GoogleLogin } from '@react-oauth/google';
import { useRegisterProvider } from '../../Hooks/useAuth';
import GoogleLoginButton from '../../components/Providers/GoogleLogin';
import FacebookLoginButton from '../../components/Providers/FacebookLogin';

declare global {
  interface Window {
    AppleID: any;
  }
}

const Login = (): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { control, handleSubmit, watch } = useForm<LoginFormInput>();
  const [step, setActiveStep] = useAtom(UserActiveStep);
  const { mutate: registerProvider, isPending: isRegisteringProvider } = useRegisterProvider();

  const formValues = watch();

  const [isFormEmpty, setIsFormEmpty] = useState(true);

  const handleRegister = () => {
    setActiveStep(authSteps[AuthStepValueTypes.RegisterInfo]);
  };

  useEffect(() => {
    setIsFormEmpty(Object.values(formValues).some((value) => !value));
  }, [formValues]);

  const onSubmit = (data: LoginFormInput) => {
    console.log('Form submitted with data:', data);
  };

  useEffect(() => {
    window.AppleID.auth.init({
      clientId: 'com.your.bundle.id', // Needs real value if you go live
      scope: 'name email',
      redirectURI: 'https://your-app.com/callback', // Needs to be HTTPS and match Apple's config
      usePopup: true,
    });
  }, []);

  const handleAppleLogin = () => {
    try {
      window.AppleID.auth.signIn(); // This opens the Apple login popup (will error without real config)
    } catch (e) {
      console.error('Mocking Apple Login (no real credentials)');
      // MOCK fallback: simulate a successful login response for UI/dev testing
      const mockAppleUser = {
        id_token: 'mock-id-token',
        user: {
          email: 'test@apple.com',
          name: {
            firstName: 'Test',
            lastName: 'User',
          },
        },
      };
      console.log('Mock Apple login success:', mockAppleUser);
      // Call your backend endpoint with mockAppleUser if needed
    }
  };

  return (
    <>
      <HeaderContainer>
        <Typography value={t('WelcomePage.LoginPageTitle')} variant={TypographyTypes.H1} />
        <Typography value={t('WelcomePage.LoginPageSubtitle')} variant={TypographyTypes.H3} />
      </HeaderContainer>
      <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
        <SignInContainer>
          <StyledInput
            inputName="Email"
            control={control}
            placeholder={t(`WelcomePage.LoginEmailPlaceholder`)}
          />
          <StyledInput
            inputName="Password"
            control={control}
            placeholder={t(`WelcomePage.LoginPasswordPlaceholder`)}
            endIcon={
              formValues.Password === '' || formValues.Password === undefined
                ? NotVisiblaeIcon
                : VisableIcon
            }
            maskValue
          />
          <Typography
            value={t('WelcomePage.ForgetPassword')}
            variant={TypographyTypes.TextSmall}
            styleProps={{ paddingRight: 16 }}
            onClick={() => setActiveStep(authSteps[AuthStepValueTypes.ForgetPassword])}
          />
          <StyledButton
            value={t('WelcomePage.Login')}
            colorVariant={ThemeType.Primary}
            onClick={handleSubmit((data) => console.log(data))}
            disabled={isFormEmpty}
          />
        </SignInContainer>
      </form>
      <BottomContainer>
        <ConnectionOptionsContainer>
          <DividerWithText textAlign="center">
            <Typography
              value={t('WelcomePage.ConnectWith')}
              variant={TypographyTypes.TextSmall}
              styleProps={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            />
          </DividerWithText>
          <ConnectionOptions>
            <FacebookLoginButton />
            <GoogleLoginButton />
            <AppleIcon onClick={handleAppleLogin}></AppleIcon>
          </ConnectionOptions>
        </ConnectionOptionsContainer>
        <DontHaveAccountContainer onClick={handleRegister}>
          <Typography
            value={t('WelcomePage.DontHaveAccount')}
            variant={TypographyTypes.TextMedium}
          />
          <Typography
            value={t('WelcomePage.RegisterNow')}
            variant={TypographyTypes.TextMedium}
            styleProps={{ color: theme.palette.primary.main }}
          />
        </DontHaveAccountContainer>
      </BottomContainer>
    </>
  );
};

export default Login;

declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: any;
  }
}

export {};
