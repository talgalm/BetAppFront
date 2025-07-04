import { useTranslation } from 'react-i18next';
import { Typography } from '@components/Topography/typography';
import { HeaderContainer, SignInContainer } from './Login.styles';
import StyledInput from '@components/Inputs/StyledInput/StyledInput';
import { ReactComponent as VisableIcon } from '@assets/icons/authIcons/isVisibaleIcon.svg';
import { ReactComponent as NotVisiblaeIcon } from '@assets/icons/authIcons/notVisibaleIcon.svg';
import { useFormContext } from 'react-hook-form';
import { LoginFormInput } from '@interfaces/Auth.interface';
import { ThemeType } from '@theme/theme';
import StyledButton from '@components/Button/StyledButton';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { UserActiveStep } from '@store/authStepAtom';
import { authSteps, AuthStepValueTypes } from '../welcome-page/auth-steps';
import ConnectionOptions from '../connection-options/ConnectionOptions';
import { useNavigate } from 'react-router-dom';
import BetLoader from '@components/loader/loader';
import { useLogin } from '../hooks/useLogin';
import { TypographyTypes } from '@components/Topography/TypographyTypes';
import { useProfile } from '@providers/useProfile';
import { useQueryClient } from '@tanstack/react-query';

const Login = (): JSX.Element => {
  const { t } = useTranslation();
  const { control, handleSubmit, watch, getValues } = useFormContext<LoginFormInput>();
  const [, setActiveStep] = useAtom(UserActiveStep);
  const { mutate, isPending } = useLogin();
  const navigate = useNavigate();
  const [maskPassword, setMaskPassword] = useState(true);
  const formValues = watch();
  const { refetch } = useProfile(false);
  const [isFormEmpty, setIsFormEmpty] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    setIsFormEmpty(Object.values(formValues).some((value) => !value));
    queryClient.clear();
    queryClient.removeQueries();
    queryClient.resetQueries();
    queryClient.cancelQueries();
  }, [formValues, queryClient]);

  const onSubmit = (data: LoginFormInput) => {
    const values = getValues();
    mutate(values, {
      onSuccess: async (res) => {
        await refetch();
        navigate(`/home`);
      },
      onError: (error: any) => {
        console.error('Registration failed:', error);
        alert(t('WelcomePage.RegistrationFailed'));
      },
    });
  };

  if (isPending) {
    return <BetLoader />;
  }

  return (
    <>
      <HeaderContainer>
        <Typography value={t('WelcomePage.LoginPageTitle')} variant={TypographyTypes.H1} />
        <Typography value={t('WelcomePage.LoginPageSubtitle')} variant={TypographyTypes.H3} />
      </HeaderContainer>
      <form style={{ width: '100%' }}>
        <SignInContainer>
          <StyledInput
            inputName="email"
            control={control}
            placeholder={t(`WelcomePage.LoginEmailPlaceholder`)}
          />
          <StyledInput
            inputName="password"
            control={control}
            placeholder={t(`WelcomePage.RegisterPasswordPlaceholder`)}
            endIcon={maskPassword ? NotVisiblaeIcon : VisableIcon}
            endIconOnClick={() => setMaskPassword((prev) => !prev)}
            maskValue={maskPassword}
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
            onClick={handleSubmit(onSubmit)}
            disabled={isFormEmpty}
          />
        </SignInContainer>
      </form>
      <ConnectionOptions current="Register" />
    </>
  );
};

export default Login;
