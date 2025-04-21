import { Typography } from '../../components/Topography/topography';
import { TypographyTypes } from '../../Theme/Typography/typography';
import { HeaderContainer, SignInContainer } from './Register.styles';
import StyledInput from '../../components/Inputs/StyledInput/StyledInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ThemeType } from '../../Theme/theme';
import StyledButton from '../../components/Button/StyledButton';
import { useTranslation } from 'react-i18next';
import { RegisterProviderFormInput } from '../Login/interface';
import { useAtom } from 'jotai';
import { UserActiveStep } from '../../Jotai/UserAtoms';
import { authSteps, AuthStepValueTypes } from '../WelcomePage/interface';
import { useUpdateUser } from '../../Hooks/useAuth';
import BetLoader from '../../Theme/Loader/loader';
import ConnectionOptions from '../ConnectionOptions/ConnectionOptions';

const RegisterProvider = (): JSX.Element => {
  const { t } = useTranslation();
  const [step, setActiveStep] = useAtom(UserActiveStep);
  const { mutate: updatePhone, isPending: isUpdatePhone } = useUpdateUser();
  const {
    control: providerControl,
    watch: providerWatch,
    handleSubmit: handlUpdatePhone,
  } = useForm<RegisterProviderFormInput>();

  const providerPhoneNumber = providerWatch('PhoneNumber');

  const handleUpdatePhoneProvider: SubmitHandler<RegisterProviderFormInput> = (data) => {
    const tempId = localStorage.getItem('tempId');
    console.log(tempId, data);
    updatePhone(
      {
        id: tempId || '-1',
        PhoneNumber: data.PhoneNumber,
      },
      {
        onSuccess: () => {
          localStorage.removeItem('tempId');
          setActiveStep(authSteps[AuthStepValueTypes.SuccessfulRegister]);
        },
        onError: (error: any) => {
          console.error('Registration failed:', error);
          alert(t('WelcomePage.RegistrationFailed'));
        },
      }
    );
  };
  if (isUpdatePhone) {
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
      {step.step === AuthStepValueTypes.RegisterProvider && (
        <form style={{ width: '100%' }}>
          <SignInContainer>
            <StyledInput
              inputName="PhoneNumber"
              control={providerControl}
              placeholder={t(`WelcomePage.RegisterPhoneNumberPlaceholder`)}
            />
            <StyledButton
              value={t('WelcomePage.UpdateNumber')}
              colorVariant={ThemeType.Primary}
              onClick={handlUpdatePhone(handleUpdatePhoneProvider)}
              disabled={!providerPhoneNumber}
            />
          </SignInContainer>
        </form>
      )}
      <ConnectionOptions current="Login" />
    </>
  );
};

export default RegisterProvider;
