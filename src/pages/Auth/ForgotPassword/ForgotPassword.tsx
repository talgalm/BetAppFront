import { useTranslation } from 'react-i18next';
import { Typography } from '../../../components/Topography/topography';
import { HeaderContainer, SignInContainer } from './ForgotPassword.styles';
import { TypographyTypes } from '../../../Theme/Typography/typography';
import StyledInput from '../../../components/Inputs/StyledInput/StyledInput';
import { ForgotPasswordFormInput } from '../Login/interface';
import { useFormContext } from 'react-hook-form';
import StyledButton from '../../../components/Button/StyledButton';
import { ThemeType } from '../../../Theme/theme';
import { UserActiveStep } from '../../../Jotai/UserAtoms';
import { useAtom } from 'jotai';
import { authSteps, AuthStepValueTypes } from '../WelcomePage/interface';

const ForgetPassword = (): JSX.Element => {
  const { t } = useTranslation();
  const { control: forgetPasswordControl, watch: watchForgetPassword } =
    useFormContext<ForgotPasswordFormInput>();

  const emailValidation = watchForgetPassword('Email');

  const [step, setActiveStep] = useAtom(UserActiveStep);

  const handleNextStep = () => {
    if (step.next) {
      setActiveStep(authSteps[step.next]);
    }
  };

  const isDisable = () => {
    if (step.step === AuthStepValueTypes.ForgetPassword) {
      return !emailValidation || emailValidation === '';
    }
    return false;
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
        <StyledButton
          value={t(`WelcomePage.${step.step}Button`)}
          colorVariant={ThemeType.Primary}
          onClick={handleNextStep}
          disabled={isDisable()}
        />
      </SignInContainer>
    </>
  );
};

export default ForgetPassword;
