import { Typography } from '../../../components/Topography/topography';
import { TypographyTypes } from '../../../Theme/Typography/typography';
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
import { useState } from 'react';
import { useRegister } from '../../../Hooks/useAuth';
import BetLoader from '../../../Theme/Loader/loader';
import ConnectionOptions from '../ConnectionOptions/ConnectionOptions';

const Register = (): JSX.Element => {
  const { t } = useTranslation();
  const [step, setActiveStep] = useAtom(UserActiveStep);
  const [maskPassword, setMaskPassword] = useState(true);
  const [maskPasswordVerification, setMaskPasswordVerification] = useState(true);
  const { mutate: register, isPending: isRegistering } = useRegister();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useFormContext<RegisterFormInput>();

  const email = watch('Email');
  const phoneNumber = watch('PhoneNumber');
  const fullName = watch('FullName');
  const password = watch('Password');
  const passwordVerification = watch('PasswordVerification');

  const onSubmit: SubmitHandler<RegisterFormInput> = (data) => {
    register(data, {
      onSuccess: () => {
        handleNextStep();
      },
      onError: (error: any) => {
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
    const valid = await trigger(['Email', 'FullName', 'PhoneNumber']);
    if (valid) {
      handleNextStep();
    }
    return;
  };

  if (isRegistering) {
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
      <ConnectionOptions current="Login" />
    </>
  );
};

export default Register;
