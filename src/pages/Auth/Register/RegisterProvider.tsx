import { Typography } from '@components/Topography/typography';
import { HeaderContainer, SignInContainer } from './Register.styles';
import StyledInput from '@components/Inputs/StyledInput/StyledInput';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { ThemeType } from '@theme/theme';
import StyledButton from '@components/Button/StyledButton';
import { useTranslation } from 'react-i18next';
import { RegisterProviderFormInput } from '@interfaces/Auth.interface';
import { useAtom } from 'jotai';
import { UserActiveStep } from '@store/authStepAtom';
import { authSteps, AuthStepValueTypes } from '../WelcomePage/auth-steps';
import BetLoader from '@components/loader/loader';
import ConnectionOptions from '../ConnectionOptions/ConnectionOptions';
import { useUpdateUser } from '../Hooks/useUpdateUser';
import { TypographyTypes } from '@components/Topography/TypographyTypes';
import { VerifiedUserAtom } from '../../../store/userAtoms';

const RegisterProvider = (): JSX.Element => {
  const { t } = useTranslation();
  const [, setActiveStep] = useAtom(UserActiveStep);
  const { mutate, isPending } = useUpdateUser();
  const [verifiedUserId, setVerifiedUser] = useAtom(VerifiedUserAtom);

  const { control, watch, handleSubmit } = useFormContext<RegisterProviderFormInput>();

  const providerPhoneNumber = watch('PhoneNumber');

  const onSubmit: SubmitHandler<RegisterProviderFormInput> = (data) => {
    mutate(
      {
        id: verifiedUserId || '-1',
        PhoneNumber: data.PhoneNumber,
      },
      {
        onSuccess: () => {
          setVerifiedUser(null);
          setActiveStep(authSteps[AuthStepValueTypes.SuccessfulRegister]);
        },
        onError: (error: Error) => {
          console.error('Registration failed:', error);
          alert(t('WelcomePage.RegistrationFailed'));
        },
      }
    );
  };

  const handleSkip = () => {
    setActiveStep(authSteps[AuthStepValueTypes.SuccessfulRegister]);
  };

  if (isPending) {
    return <BetLoader />;
  }

  return (
    <>
      <HeaderContainer>
        <Typography
          value={t(`WelcomePage.ProviderCreateNewAccount`)}
          variant={TypographyTypes.H1}
        />
        <Typography
          value={t(`WelcomePage.ProviderCreateNewAccountSubtitle`)}
          variant={TypographyTypes.H3}
        />
      </HeaderContainer>
      <form style={{ width: '100%' }}>
        <SignInContainer>
          <StyledInput
            inputName="PhoneNumber"
            control={control}
            placeholder={t(`WelcomePage.RegisterPhoneNumberPlaceholder`)}
          />
          <StyledButton
            value={t('WelcomePage.UpdateNumber')}
            colorVariant={ThemeType.Primary}
            onClick={handleSubmit(onSubmit)}
            disabled={!providerPhoneNumber}
          />
          <StyledButton
            value={t('WelcomePage.UpdateNumberSkip')}
            colorVariant={ThemeType.Secondary}
            onClick={handleSkip}
            disabled={!providerPhoneNumber}
            styleProps={{ border: '2px solid #15AB94' }}
          />
        </SignInContainer>
      </form>
      <ConnectionOptions current="Login" />
    </>
  );
};

export default RegisterProvider;
