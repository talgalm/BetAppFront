import { useTranslation } from 'react-i18next';
import { Typography } from '@components/Topography/typography';
import { useTheme } from '@mui/material/styles';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { UserActiveStep } from '@store/authStepAtom';
import { TypographyTypes } from '@components/Topography/TypographyTypes';
import { authSteps, AuthStepValueTypes } from '../welcome-page/auth-steps';
import FacebookLoginButton from './FacebookLogin';
import GoogleLoginButton from './GoogleLogin';
import {
  BottomContainer,
  ConnectionOptionsContainer,
  DividerWithText,
  ConnectionOptionsTab,
  AppleIcon,
  DontHaveAccountContainer,
  EllipsisTextStyle,
} from './ConnectionOptions.styles';

interface ConnectionOptionsProps {
  current?: string;
}

const ConnectionOptions = ({ current }: ConnectionOptionsProps): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [_, setActiveStep] = useAtom(UserActiveStep);

  const handleNextStep = () => {
    if (current === 'Register') {
      setActiveStep(authSteps[AuthStepValueTypes.RegisterInfo]);
    } else {
      setActiveStep(authSteps[AuthStepValueTypes.Login]);
    }
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
    <BottomContainer>
      <ConnectionOptionsContainer>
        <DividerWithText textAlign="center">
          <Typography
            value={t('WelcomePage.ConnectWith')}
            variant={TypographyTypes.TextSmall}
            styleProps={EllipsisTextStyle}
          />
        </DividerWithText>
        <ConnectionOptionsTab>
          <FacebookLoginButton />
          <GoogleLoginButton />
          <AppleIcon onClick={handleAppleLogin}></AppleIcon>
        </ConnectionOptionsTab>
      </ConnectionOptionsContainer>
      {current && (
        <DontHaveAccountContainer onClick={handleNextStep}>
          <Typography
            value={t(`WelcomePage.${current}DontHave`)}
            variant={TypographyTypes.TextMedium}
          />
          <Typography
            value={t(`WelcomePage.${current}Now`)}
            variant={TypographyTypes.TextMedium}
            styleProps={{ color: theme.palette.primary.main }}
          />
        </DontHaveAccountContainer>
      )}
    </BottomContainer>
  );
};

export default ConnectionOptions;

declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: any;
    AppleID: any;
  }
}

export {};
