import { useTranslation } from 'react-i18next';
import { Typography } from '@components/Topography/typography';
import { HeaderContainer, SignInContainer } from './ForgotPassword.styles';
import StyledInput from '@components/Inputs/StyledInput/StyledInput';
import { ForgotPasswordFormInput } from '@interfaces/Auth.interface';
import { useFormContext } from 'react-hook-form';
import StyledButton from '@components/Button/StyledButton';
import { ThemeType } from '../../../theme/theme';
import { UserActiveStep } from '@store/authStepAtom';
import { useAtom } from 'jotai';
import { authSteps, AuthStepValueTypes } from '../WelcomePage/auth-steps';
import { useForgetPassword } from '../Hooks/useForgetPassword';
import BetLoader from '../../../theme/loader/loader';
import { TypographyTypes } from '@components/Topography/TypographyTypes';

const ForgetPassword = (): JSX.Element => {
  const { t } = useTranslation();
  const { control, watch, setError, clearErrors } = useFormContext<ForgotPasswordFormInput>();

  const emailValidation = watch('Email');
  const { mutate, isPending } = useForgetPassword();

  const [step, setActiveStep] = useAtom(UserActiveStep);

  const handleNextStep = () => {
    mutate(emailValidation, {
      onSuccess: (data) => {
        if (!data.send) {
          setError('Email', {
            type: 'manual',
            message: t('Register.Validation.EmailAlreadyExists'),
          });
        } else {
          clearErrors('Email');
          if (step.next) {
            setActiveStep(authSteps[step.next]);
          }
        }
      },
      onError: () => {
        setError('Email', {
          type: 'manual',
          message: t('Register.Validation.ServerError'),
        });
      },
    });
  };

  const isDisable = () => {
    if (step.step === AuthStepValueTypes.ForgetPassword) {
      return !emailValidation || emailValidation === '';
    }
    return false;
  };

  if (isPending) {
    return <BetLoader />;
  }

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
            control={control}
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
