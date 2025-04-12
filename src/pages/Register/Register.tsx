import { Typography } from '../../components/Topography/topography';
import { TypographyTypes } from '../../Theme/Typography/typography';
import {
  AppleIcon,
  BottomContainer,
  ConnectionOptions,
  ConnectionOptionsContainer,
  DividerWithText,
  FacebookIcon,
  GoogleIcon,
  HeaderContainer,
  SignInContainer,
} from './Register.styles';
import StyledInput from '../../components/Inputs/StyledInput/StyledInput';
import { ReactComponent as VisableIcon } from '../../Theme/Icons/AuthIcons/isVisibaleIcon.svg';
import { ReactComponent as NotVisiblaeIcon } from '../../Theme/Icons/AuthIcons/notVisibaleIcon.svg';
import { useForm } from 'react-hook-form';
import { ThemeType } from '../../Theme/theme';
import StyledButton from '../../components/Button/StyledButton';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { RegisterFormInput } from '../Login/interface';
import { useAtom } from 'jotai';
import { UserActiveStep } from '../../Jotai/UserAtoms';
import { authSteps, AuthStepValueTypes } from '../WelcomePage/interface';
import { useState } from 'react';

const Register = (): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [step, setActiveStep] = useAtom(UserActiveStep);
  const [maskPassword, setMaskPassword] = useState(true);
  const [maskPasswordVerification, setMaskPasswordVerification] = useState(true);

  const { control, handleSubmit, watch } = useForm<RegisterFormInput>();

  const email = watch('Email');
  const phoneNumber = watch('PhoneNumber');
  const fullName = watch('FullName');
  const password = watch('Password');
  const passwordVerification = watch('PasswordVerification');

  const onSubmit = (data: RegisterFormInput) => {
    console.log('Form submitted with data:', data);
    handleNextStep();
  };

  const handleNextStep = () => {
    if (step.next) {
      setActiveStep(authSteps[step.next]);
    }
  };

  return (
    <>
      <HeaderContainer>
        <Typography value={t('WelcomePage.CreateNewAccount')} variant={TypographyTypes.H1} />
        <Typography
          value={t('WelcomePage.CreateNewAccountSubtitle')}
          variant={TypographyTypes.H3}
        />
      </HeaderContainer>
      <form style={{ width: '100%' }}>
        {step.step === AuthStepValueTypes.RegisterInfo && (
          <SignInContainer>
            <StyledInput
              inputName="Email"
              control={control}
              placeholder={t(`WelcomePage.RegisterEmailPlaceholder`)}
            />
            <StyledInput
              inputName="FullName"
              control={control}
              placeholder={t(`WelcomePage.RegisterFullNamePlaceholder`)}
            />
            <StyledInput
              inputName="PhoneNumber"
              control={control}
              placeholder={t(`WelcomePage.RegisterPhoneNumberPlaceholder`)}
            />
            <StyledButton
              value={t('WelcomePage.Continue')}
              colorVariant={ThemeType.Primary}
              onClick={handleNextStep}
              disabled={!email || !phoneNumber || !fullName}
            />
          </SignInContainer>
        )}
        {step.step === AuthStepValueTypes.RegisterPassword && (
          <SignInContainer>
            <StyledInput
              inputName="Password"
              control={control}
              placeholder={t(`WelcomePage.RegisterPasswordPlaceholder`)}
              endIcon={maskPassword ? NotVisiblaeIcon : VisableIcon}
              endIconOnClick={() => setMaskPassword((prev) => !prev)}
              maskValue={maskPassword}
            />
            <StyledInput
              inputName="PasswordVerification"
              control={control}
              placeholder={t(`WelcomePage.RegisterPasswordVerificationPlaceholder`)}
              endIcon={maskPasswordVerification ? NotVisiblaeIcon : VisableIcon}
              endIconOnClick={() => setMaskPasswordVerification((prev) => !prev)}
              maskValue={maskPasswordVerification}
            />
            <StyledButton
              value={t('WelcomePage.CreateAccount')}
              colorVariant={ThemeType.Primary}
              onClick={handleSubmit(onSubmit)}
              disabled={!password || !passwordVerification}
            />
          </SignInContainer>
        )}
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
      </BottomContainer>
    </>
  );
};

export default Register;
