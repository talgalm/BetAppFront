import { useTranslation } from 'react-i18next';
import { Typography } from '../../components/Topography/topography';
import { HeaderContainer, SignInContainer } from './ForgotPassword.styles';
import { TypographyTypes } from '../../Theme/Typography/typography';
import StyledInput from '../../components/Inputs/InputTextFull/InputTextFull';
import { ForgotPasswordFormInput } from '../Login/interface';
import { useForm } from 'react-hook-form';
import StyledButton from '../../components/Button/StyledButton';
import { ThemeType } from '../../Theme/theme';

const ForgetPassword = (): JSX.Element => {
  const { t } = useTranslation();
  const { control, watch } = useForm<ForgotPasswordFormInput>();
  const emailValidation = watch('Email');

  return (
    <>
      <HeaderContainer>
        <Typography value={t('WelcomePage.ForgotPasswordTitle')} variant={TypographyTypes.H1} />
        <Typography value={t('WelcomePage.ForgotPasswordSubtitle')} variant={TypographyTypes.H3} />
      </HeaderContainer>
      <SignInContainer>
        <StyledInput
          inputName="Email"
          control={control}
          placeholder={t(`WelcomePage.EnterEmail`)}
        />
        <StyledButton
          value={t('WelcomePage.SendCode')}
          colorVariant={ThemeType.Primary}
          onClick={() => console.log()}
          disabled={emailValidation === undefined || emailValidation === ''}
        />
      </SignInContainer>
    </>
  );
};

export default ForgetPassword;
