import { useTranslation } from 'react-i18next';
import { Typography } from '../../components/Topography/topography';
import { TypographyTypes } from '../../Theme/Typography/typography';
import { HeaderContainer, SignInContainer } from './Login.styles';
import StyledInput from '../../components/Inputs/StyledInput/StyledInput';
import { ReactComponent as VisableIcon } from '../../Theme/Icons/AuthIcons/isVisibaleIcon.svg';
import { ReactComponent as NotVisiblaeIcon } from '../../Theme/Icons/AuthIcons/notVisibaleIcon.svg';
import { useForm } from 'react-hook-form';
import { LoginFormInput } from './interface';
import { ThemeType } from '../../Theme/theme';
import StyledButton from '../../components/Button/StyledButton';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { UserActiveStep } from '../../Jotai/UserAtoms';
import { authSteps, AuthStepValueTypes } from '../WelcomePage/interface';
import ConnectionOptions from '../ConnectionOptions/ConnectionOptions';
import { useLogin } from '../../Hooks/useAuth';
import { userAtom } from '../../Jotai/atoms';
import { useNavigate } from 'react-router-dom';

const Login = (): JSX.Element => {
  const { t } = useTranslation();
  const { control, handleSubmit, watch } = useForm<LoginFormInput>();
  const [step, setActiveStep] = useAtom(UserActiveStep);
  const { mutate, isPending } = useLogin();
  const [, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  const formValues = watch();

  const [isFormEmpty, setIsFormEmpty] = useState(true);

  useEffect(() => {
    setIsFormEmpty(Object.values(formValues).some((value) => !value));
  }, [formValues]);

  const onSubmit = (data: LoginFormInput) => {
    mutate(data, {
      onSuccess: (res) => {
        localStorage.removeItem('AuthStep');
        localStorage.setItem('token', res.token);
        setUser(res.user);
        navigate(`/home`);
      },
      onError: (error: any) => {
        console.error('Registration failed:', error);
        alert(t('WelcomePage.RegistrationFailed'));
      },
    });
  };

  return (
    <>
      <HeaderContainer>
        <Typography value={t('WelcomePage.LoginPageTitle')} variant={TypographyTypes.H1} />
        <Typography value={t('WelcomePage.LoginPageSubtitle')} variant={TypographyTypes.H3} />
      </HeaderContainer>
      <form style={{ width: '100%' }}>
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
            maskValue
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
