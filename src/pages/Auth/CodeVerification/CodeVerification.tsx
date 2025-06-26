import { useTranslation } from 'react-i18next';
import { Typography } from '@components/Topography/typography';
import StyledButton from '@components/Button/StyledButton';
import { ThemeType } from '../../../theme/theme';
import { UserActiveStep } from '@store/authStepAtom';
import { useAtom } from 'jotai';
import { authSteps, AuthStepValueTypes } from '../WelcomePage/auth-steps';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  DontHaveAccountContainer,
  HeaderContainer,
  SignInContainer,
} from '../ConnectionOptions/ConnectionOptions.styles';
import { CubeInput, CubesContainer } from '../ForgotPassword/ForgotPassword.styles';
import { useVerifyCode } from '../Hooks/useVerifyCode';
import BetLoader from '../../../theme/loader/loader';
import { TypographyTypes } from '@components/Topography/TypographyTypes';
import { VerifiedUserAtom } from '../../../store/userAtoms';

const CodeVerification = (): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { mutate, isPending } = useVerifyCode();
  const [, setVerifiedUser] = useAtom(VerifiedUserAtom);

  const [step, setActiveStep] = useAtom(UserActiveStep);
  const [value, setValue] = useState('');

  const handleNextStep = () => {
    if (step.next) {
      setActiveStep(authSteps[step.next]);
    }
  };

  useEffect(() => {
    if (value.length === 4) {
      handleCodeCheck();
    }
  }, [value]);

  const isDisable = () => {
    if (step.step === AuthStepValueTypes.VerificationCode) {
      return value.length < 4;
    }
    return false;
  };

  const handleNextDigit = (digit: string, index: number) => {
    const newValue = value.split('');

    if (digit) {
      newValue[index] = digit;
      if (index < 3) {
        document.getElementById(`input-${index + 1}`)?.focus();
      }
    } else {
      newValue[index] = '';
      if (index > 0) {
        document.getElementById(`input-${index - 1}`)?.focus();
      }
    }

    setValue(newValue.join(''));
  };

  if (isPending) {
    <BetLoader />;
  }

  const handleCodeCheck = () => {
    mutate(value, {
      onSuccess: (data) => {
        if (!data) {
          alert('code dont match');
        } else {
          if (step.next) {
            setVerifiedUser(data.userId);
            setActiveStep(authSteps[step.next]);
          }
        }
      },
      onError: () => {
        alert('server error');
      },
    });
  };

  return (
    <>
      <HeaderContainer>
        <Typography value={t(`WelcomePage.${step.step}Title`)} variant={TypographyTypes.H1} />
        <Typography value={t(`WelcomePage.${step.step}Subtitle`)} variant={TypographyTypes.H3} />
      </HeaderContainer>
      <SignInContainer>
        {step.step === AuthStepValueTypes.VerificationCode && (
          <CubesContainer>
            <CubesContainer>
              {[...Array(4)].map((_, i) => (
                <CubeInput
                  key={i}
                  id={`input-${i}`}
                  value={value[i] || ''}
                  onChange={(e) => handleNextDigit(e.target.value, i)}
                  hasValue={!!value[i]}
                  variant="outlined"
                  inputProps={{ maxLength: 1 }}
                />
              ))}
            </CubesContainer>
          </CubesContainer>
        )}
        <StyledButton
          value={t(`WelcomePage.${step.step}Button`)}
          colorVariant={ThemeType.Primary}
          onClick={handleNextStep}
          disabled={isDisable()}
        />
        <DontHaveAccountContainer>
          <Typography value={t('WelcomePage.DidntGetCode')} variant={TypographyTypes.TextMedium} />
          <Typography
            value={t('WelcomePage.SendNewCode')}
            variant={TypographyTypes.TextMedium}
            styleProps={{ color: theme.palette.primary.main }}
          />
        </DontHaveAccountContainer>
      </SignInContainer>
    </>
  );
};

export default CodeVerification;
