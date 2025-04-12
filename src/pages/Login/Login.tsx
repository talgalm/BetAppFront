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

const Login = (): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { control, handleSubmit, watch } = useForm<LoginFormInput>();
  const [step, setActiveStep] = useAtom(UserActiveStep);

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
            <FacebookIcon></FacebookIcon>
            <GoogleIcon></GoogleIcon>
            <AppleIcon></AppleIcon>
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
