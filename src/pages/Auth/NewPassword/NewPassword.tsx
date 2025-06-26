import { useTranslation } from 'react-i18next';
import { Typography } from '@components/Topography/typography';
import StyledInput from '@components/Inputs/StyledInput/StyledInput';
import { NewPasswordFormInput } from '@interfaces/Auth.interface';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import StyledButton from '@components/Button/StyledButton';
import { ThemeType } from '../../../theme/theme';
import { UserActiveStep } from '@store/authStepAtom';
import { useAtom } from 'jotai';
import { authSteps, AuthStepValueTypes } from '../WelcomePage/auth-steps';
import { useState } from 'react';
import { ReactComponent as VisableIcon } from '../../../theme/icons/authIcons/isVisibaleIcon.svg';
import { ReactComponent as NotVisiblaeIcon } from '../../../theme/icons/authIcons/notVisibaleIcon.svg';
import { HeaderContainer, SignInContainer } from './NewPassword.styles';
import { useUpdateUser } from '../Hooks/useUpdateUser';
import BetLoader from '../../../theme/loader/loader';
import { TypographyTypes } from '@components/Topography/TypographyTypes';
import { VerifiedUserAtom } from '../../../store/userAtoms';

const NewPassword = (): JSX.Element => {
  const { t } = useTranslation();
  const { control, watch, handleSubmit } = useFormContext<NewPasswordFormInput>();

  const passwordNew = watch('Password');
  const passwordValidationNew = watch('PasswordVerification');

  const [step, setActiveStep] = useAtom(UserActiveStep);
  const [verifiedUserId, setVerifiedUser] = useAtom(VerifiedUserAtom);
  const { mutate, isPending } = useUpdateUser();
  const [value] = useState('');
  const [maskPassword, setMaskPassword] = useState(true);
  const [maskPasswordVerification, setMaskPasswordVerification] = useState(true);

  const onSubmit: SubmitHandler<NewPasswordFormInput> = (data) => {
    mutate(
      {
        id: verifiedUserId || '-1',
        Password: data.Password,
      },
      {
        onSuccess: () => {
          setVerifiedUser(null);
          if (step.next) {
            setActiveStep(authSteps[step.next]);
          }
        },
        onError: (error: Error) => {
          console.error('Password failed:', error);
          alert(t('WelcomePage.PasswordFailed'));
        },
      }
    );
  };

  const isDisable = () => {
    if (step.step === AuthStepValueTypes.VerificationCode) {
      return value.length < 4;
    } else if (step.step === AuthStepValueTypes.NewPassword) {
      return !passwordNew || !passwordValidationNew;
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
        <form style={{ width: '100%' }}>
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
            onClick={handleSubmit(onSubmit)}
            disabled={isDisable()}
          />
        </form>
      </SignInContainer>
    </>
  );
};

export default NewPassword;
