import { useTranslation } from 'react-i18next';
import { Typography } from '../../components/Topography/topography';
import {
  CubeInput,
  CubesContainer,
  DontHaveAccountContainer,
  HeaderContainer,
  SignInContainer,
} from './ForgotPassword.styles';
import { TypographyTypes } from '../../Theme/Typography/typography';
import StyledInput from '../../components/Inputs/StyledInput/StyledInput';
import { ForgotPasswordFormInput, NewPasswordFormInput } from '../Login/interface';
import { useForm } from 'react-hook-form';
import StyledButton from '../../components/Button/StyledButton';
import { ThemeType } from '../../Theme/theme';
import { UserActiveStep } from '../../Jotai/UserAtoms';
import { useAtom } from 'jotai';
import { authSteps, AuthStepValueTypes } from '../WelcomePage/interface';
import { useState } from 'react';
import { ReactComponent as VisableIcon } from '../../Theme/Icons/AuthIcons/isVisibaleIcon.svg';
import { ReactComponent as NotVisiblaeIcon } from '../../Theme/Icons/AuthIcons/notVisibaleIcon.svg';
import { useTheme } from '@mui/material/styles';

const ForgetPassword = (): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { control: forgetPasswordControl, watch: watchForgetPassword } =
    useForm<ForgotPasswordFormInput>();
  const { control: newPasswordControl, watch: watchNewPassword } = useForm<NewPasswordFormInput>();

  const emailValidation = watchForgetPassword('Email');
  const passwordNew = watchNewPassword('Password');
  const passwordValidationNew = watchNewPassword('PasswordVerification');

  const [step, setActiveStep] = useAtom(UserActiveStep);
  const [value, setValue] = useState('');
  const [maskPassword, setMaskPassword] = useState(true);
  const [maskPasswordVerification, setMaskPasswordVerification] = useState(true);

  const handleNextStep = () => {
    if (step.next) {
      console.log(authSteps[step.next]);
      setActiveStep(authSteps[step.next]);
    }
  };

  const isDisable = () => {
    if (step.step === AuthStepValueTypes.ForgetPassword) {
      return !emailValidation || emailValidation === '';
    } else if (step.step === AuthStepValueTypes.VerificationCode) {
      return value.length < 4;
    } else if (step.step === AuthStepValueTypes.NewPassword) {
      console.log(passwordNew);
      console.log(passwordValidationNew);
      return !passwordNew || !passwordValidationNew;
    }
    return false;
  };

  const handleNextDigit = (digit: string, index: number) => {
    const newValue = value.split('');

    if (digit) {
      newValue[index] = digit;
      if (index < 3) {
        document.getElementById(`input-${index + 1}`)?.focus();
      }
    } else {
      newValue[index] = '';
      if (index > 0) {
        document.getElementById(`input-${index - 1}`)?.focus();
      }
    }

    setValue(newValue.join(''));
  };

  return (
    <>
      <HeaderContainer>
        <Typography value={t(`WelcomePage.${step.step}Title`)} variant={TypographyTypes.H1} />
        <Typography value={t(`WelcomePage.${step.step}Subtitle`)} variant={TypographyTypes.H3} />
      </HeaderContainer>
      <SignInContainer>
        {step.step === AuthStepValueTypes.ForgetPassword && (
          <StyledInput
            inputName="Email"
            control={forgetPasswordControl}
            placeholder={t(`WelcomePage.EnterEmail`)}
          />
        )}
        {step.step === AuthStepValueTypes.NewPassword && (
          <>
            <StyledInput
              inputName="Password"
              control={newPasswordControl}
              placeholder={t(`WelcomePage.RegisterPasswordPlaceholder`)}
              endIcon={maskPassword ? NotVisiblaeIcon : VisableIcon}
              endIconOnClick={() => setMaskPassword((prev) => !prev)}
              maskValue={maskPassword}
            />
            <StyledInput
              inputName="PasswordVerification"
              control={newPasswordControl}
              placeholder={t(`WelcomePage.RegisterPasswordVerificationPlaceholder`)}
              endIcon={maskPasswordVerification ? NotVisiblaeIcon : VisableIcon}
              endIconOnClick={() => setMaskPasswordVerification((prev) => !prev)}
              maskValue={maskPasswordVerification}
            />
          </>
        )}
        {step.step === AuthStepValueTypes.VerificationCode && (
          <CubesContainer>
            <CubesContainer>
              {[...Array(4)].map((_, i) => (
                <CubeInput
                  key={i}
                  id={`input-${i}`}
                  value={value[i] || ''}
                  onChange={(e) => handleNextDigit(e.target.value, i)}
                  hasValue={!!value[i]}
                  variant="outlined"
                  inputProps={{ maxLength: 1 }}
                />
              ))}
            </CubesContainer>
          </CubesContainer>
        )}
        <StyledButton
          value={t(`WelcomePage.${step.step}Button`)}
          colorVariant={ThemeType.Primary}
          onClick={handleNextStep}
          disabled={isDisable()}
        />
        {step.step === AuthStepValueTypes.VerificationCode && (
          <DontHaveAccountContainer>
            <Typography
              value={t('WelcomePage.DidntGetCode')}
              variant={TypographyTypes.TextMedium}
            />
            <Typography
              value={t('WelcomePage.SendNewCode')}
              variant={TypographyTypes.TextMedium}
              styleProps={{ color: theme.palette.primary.main }}
            />
          </DontHaveAccountContainer>
        )}
      </SignInContainer>
    </>
  );
};

export default ForgetPassword;
