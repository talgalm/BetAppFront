import { Typography } from '../../../components/Topography/topography';
import { HeaderContainer, SignInContainer } from './Register.styles';
import StyledInput from '../../../components/Inputs/StyledInput/StyledInput';
import { ReactComponent as VisableIcon } from '../../../Theme/Icons/AuthIcons/isVisibaleIcon.svg';
import { ReactComponent as NotVisiblaeIcon } from '../../../Theme/Icons/AuthIcons/notVisibaleIcon.svg';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { ThemeType } from '../../../Theme/theme';
import StyledButton from '../../../components/Button/StyledButton';
import { useTranslation } from 'react-i18next';
import { RegisterFormInput } from '../Login/interface';
import { useAtom } from 'jotai';
import { UserActiveStep } from '../../../Jotai/UserAtoms';
import { authSteps, AuthStepValueTypes } from '../WelcomePage/interface';
import { useEffect, useState } from 'react';
import BetLoader from '../../../Theme/Loader/loader';
import ConnectionOptions from '../ConnectionOptions/ConnectionOptions';
import { useDebouncedValue } from '../../../Hooks/useDebouncedEmailCheck';
import { useRegister } from '../Hooks/useRegister';
import { useCheckEmail } from '../Hooks/useCheckEmail';
import { TypographyTypes } from '../../../components/Topography/TypographyTypes';

const Register = (): JSX.Element => {
  const { t } = useTranslation();
  const [step, setActiveStep] = useAtom(UserActiveStep);
  const [maskPassword, setMaskPassword] = useState(true);
  const [maskPasswordVerification, setMaskPasswordVerification] = useState(true);
  const { mutate, isPending } = useRegister();
  const { control, handleSubmit, watch, trigger, setError, clearErrors, getValues } =
    useFormContext<RegisterFormInput>();

  const email = watch('email');
  const debouncedEmail = useDebouncedValue(email, 500);
  const { data, isSuccess } = useCheckEmail(debouncedEmail);
  const phoneNumber = watch('phoneNumber');
  const fullName = watch('fullName');
  const password = watch('password');
  const passwordVerification = watch('passwordVerification');

  useEffect(() => {
    if (!debouncedEmail || !debouncedEmail.includes('@')) {
      clearErrors('email');
      return;
    }

    if (isSuccess) {
      if (data.exists) {
        setError('email', {
          type: 'manual',
          message: t('Register.Validation.EmailAlreadyExists'),
        });
      } else {
        clearErrors('email');
      }
    }
  }, [debouncedEmail, data, isSuccess]);

  const onSubmit: SubmitHandler<RegisterFormInput> = () => {
    mutate(getValues(), {
      onSuccess: () => {
        handleNextStep();
      },
      onError: (error: Error) => {
        console.error('Registration failed:', error);
        alert(t('WelcomePage.RegistrationFailed'));
      },
    });
  };

  const handleNextStep = () => {
    if (step.next) {
      setActiveStep(authSteps[step.next]);
    }
  };

  const handleInfoStepContinue = async () => {
    const valid = await trigger(['email', 'fullName', 'phoneNumber']);
    if (valid) {
      handleNextStep();
    }
    return;
  };

  if (isPending) {
    return <BetLoader />;
  }

  return (
    <>
      <HeaderContainer>
        <Typography value={t(`WelcomePage.CreateNewAccount`)} variant={TypographyTypes.H1} />
        <Typography
          value={t(`WelcomePage.CreateNewAccountSubtitle`)}
          variant={TypographyTypes.H3}
        />
      </HeaderContainer>
      <form style={{ width: '100%' }}>
        {step.step === AuthStepValueTypes.RegisterInfo && (
          <SignInContainer>
            <StyledInput
              inputName="email"
              control={control}
              placeholder={t(`WelcomePage.RegisterEmailPlaceholder`)}
            />
            <StyledInput
              inputName="fullName"
              control={control}
              placeholder={t(`WelcomePage.RegisterFullNamePlaceholder`)}
            />
            <StyledInput
              inputName="phoneNumber"
              control={control}
              placeholder={t(`WelcomePage.RegisterPhoneNumberPlaceholder`)}
            />
            <StyledButton
              type="button"
              value={t('WelcomePage.Continue')}
              colorVariant={ThemeType.Primary}
              onClick={handleInfoStepContinue}
              disabled={!email || !phoneNumber || !fullName}
            />
          </SignInContainer>
        )}
        {step.step === AuthStepValueTypes.RegisterPassword && (
          <SignInContainer>
            <StyledInput
              inputName="password"
              control={control}
              placeholder={t(`WelcomePage.RegisterPasswordPlaceholder`)}
              endIcon={maskPassword ? NotVisiblaeIcon : VisableIcon}
              endIconOnClick={() => setMaskPassword((prev) => !prev)}
              maskValue={maskPassword}
            />
            <StyledInput
              inputName="passwordVerification"
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
      <ConnectionOptions current="Login" />
    </>
  );
};

export default Register;
