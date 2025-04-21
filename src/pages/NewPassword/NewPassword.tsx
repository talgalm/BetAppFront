import { useTranslation } from 'react-i18next';
import { Typography } from '../../components/Topography/topography';
import { TypographyTypes } from '../../Theme/Typography/typography';
import StyledInput from '../../components/Inputs/StyledInput/StyledInput';
import { useFormContext } from 'react-hook-form';
import StyledButton from '../../components/Button/StyledButton';
import { ThemeType } from '../../Theme/theme';
import { UserActiveStep } from '../../Jotai/UserAtoms';
import { useAtom } from 'jotai';
import { authSteps, AuthStepValueTypes } from '../AuthPage/WelcomePage/interface';
import { useState } from 'react';
import { ReactComponent as VisableIcon } from '../Theme/Icons/AuthIcons/isVisibaleIcon.svg';
import { ReactComponent as NotVisiblaeIcon } from '../Theme/Icons/AuthIcons/notVisibaleIcon.svg';
import { HeaderContainer, SignInContainer } from '../AuthPage/ConnectionOptions/ConnectionOptions.styles';
import { NewPasswordFormInput } from '../AuthPage/Login/interface';

const NewPassword = (): JSX.Element => {
  const { t } = useTranslation();
  const { control, watch } = useFormContext<NewPasswordFormInput>();

  const passwordNew = watch('Password');
  const passwordValidationNew = watch('PasswordVerification');

  const [step, setActiveStep] = useAtom(UserActiveStep);
  const [value] = useState('');
  const [maskPassword, setMaskPassword] = useState(true);
  const [maskPasswordVerification, setMaskPasswordVerification] = useState(true);

  const handleNextStep = () => {
    if (step.next) {
      setActiveStep(authSteps[step.next]);
    }
  };

  const isDisable = () => {
    if (step.step === AuthStepValueTypes.VerificationCode) {
      return value.length < 4;
    } else if (step.step === AuthStepValueTypes.NewPassword) {
      return !passwordNew || !passwordValidationNew;
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
        {step.step === AuthStepValueTypes.NewPassword && (
          <>
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
          </>
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

export default NewPassword;
