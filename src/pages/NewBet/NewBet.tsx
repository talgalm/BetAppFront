import {
  ButtonsContainer,
  ButtonsContainerInner,
  CheckboxContainer,
  CheckboxTextContainer,
  PageContainer,
} from './NewBet.styles';
import { CreateFormInputs, newBetSteps, NewBetStepValueTypes } from './Interface';
import { useFormContext } from 'react-hook-form';
import StyledButton from '../../components/Button/StyledButton';
import { useAtom } from 'jotai';
import { ActiveStep } from '../../Jotai/newBetAtoms';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ArrowRight } from '../../Theme/Icons/arrowRight.svg';

import { PRIMARY_COLOR } from '../../Theme/ColorTheme';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import { useEffect, useState } from 'react';
import React from 'react';
import NewBetContent from './NewBetContent/NewBetContent';
import { Checkbox } from '@mui/material';
import { TypographyTypes } from '../../Theme/Typography/typography';
import { Typography } from '../../components/Topography/topography';

const NewBet = () => {
  const [step, setActiveStep] = useAtom(ActiveStep);
  const { t } = useTranslation();
  const { control, handleSubmit, watch, setValue, unregister } = useFormContext<CreateFormInputs>();
  const [targetProgress, setTargetProgress] = useState(0);
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const formValues = watch();

  useEffect(() => {
    if (step.step === NewBetStepValueTypes.Start || step.step === NewBetStepValueTypes.Summary) {
      setDisableButton(false);
      return;
    }

    if (step.step === NewBetStepValueTypes.Description) {
      setDisableButton(false);
      return;
    }

    const currentInputName = step.inputName;
    if (!currentInputName) return;

    const currentValue = watch(currentInputName);
    if (currentValue && Array.isArray(currentValue) && currentValue.length === 0) {
      setDisableButton(true);
      return;
    }
    if (currentValue === undefined || currentValue === null || currentValue === '') {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }

    if (step.step === NewBetStepValueTypes.Coins) {
      if (currentValue === 0 || currentValue === undefined) {
        setDisableButton(true);
      } else {
        setDisableButton(false);
      }
    }
  }, [step, formValues, watch]);

  useEffect(() => {
    const savedData = localStorage.getItem('betForm');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      Object.keys(parsedData).forEach((key) => {
        setValue(key as keyof CreateFormInputs, parsedData[key]);
      });
    }
  }, [setValue]);

  useEffect(() => {
    if (step.progress) {
      setTargetProgress(step.progress);
    }
  }, [step.progress]);

  const handleStep = (
    nextStep: NewBetStepValueTypes | null,
    back?: boolean,
    continueWithout?: NewBetStepValueTypes
  ) => {
    if (continueWithout) {
      unregister(continueWithout);
    } else if (formValues) {
      localStorage.setItem('betForm', JSON.stringify(formValues));
    }
    if (step.skipToEnd) {
      setActiveStep(newBetSteps[NewBetStepValueTypes.Summary]);
    } else {
      if (nextStep) {
        const progressValue = !back
          ? Math.min(targetProgress + 10, 100)
          : Math.max(targetProgress - 10, 0);
        newBetSteps[nextStep].progress = progressValue;
        setActiveStep(newBetSteps[nextStep]);

        if (nextStep === NewBetStepValueTypes.Summary) {
          newBetSteps[nextStep].progress = 100;
          setActiveStep(newBetSteps[nextStep]);
          setTargetProgress(100);
        } else {
          setTargetProgress(progressValue);
        }
      }
    }

    if (step.step === NewBetStepValueTypes.Summary) {
      onSubmit(formValues);
    }
  };

  const onSubmit = (data: CreateFormInputs) => {
    console.log(data);
  };

  const changeNextStep = (checked: boolean) => {
    if (step.step === NewBetStepValueTypes.Description) {
      if (checked) {
        step.continueButton = NewBetStepValueTypes.Conditions;
        newBetSteps[NewBetStepValueTypes.Coins].prevButton = NewBetStepValueTypes.Conditions;
      } else {
        step.continueButton = NewBetStepValueTypes.Coins;
        newBetSteps[NewBetStepValueTypes.Coins].prevButton = NewBetStepValueTypes.Description;
      }
    }
  };

  return (
    <PageContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        {step.prevButton && <ProgressBar targetProgress={targetProgress} />}
        {step.step && (
          <NewBetContent control={control} inputName={step.inputName} type={step.step} />
        )}
        {step.step === NewBetStepValueTypes.Description && (
          <CheckboxContainer>
            <Checkbox
              onChange={(e) => changeNextStep(e.target.checked)}
              defaultChecked={false}
              sx={{
                color: PRIMARY_COLOR,
                '&.Mui-checked': {
                  color: PRIMARY_COLOR,
                },
              }}
            />
            <CheckboxTextContainer>
              <Typography
                value={t(`NewBet.DescriptionCheckboxTitle`)}
                variant={TypographyTypes.TextMedium}
                styleProps={{ color: 'black' }}
              />
              <Typography
                value={t(`NewBet.DescriptionCheckboxSubTitle`)}
                variant={TypographyTypes.TextSmall}
                styleProps={{ color: 'black' }}
              />
            </CheckboxTextContainer>
          </CheckboxContainer>
        )}
      </form>
      <ButtonsContainer>
        {step.continuteWithout && (
          <StyledButton
            value={t(`NewBet.${step.step}ContinueWithout`)}
            onClick={() => handleStep(step.continueButton, false, step.inputName)}
            styleProps={{
              width: '100%',
              backgroundColor: 'white',
              color: '#15AB94',
              border: '0px',
            }}
            icon={step.continuteWithoutIcon}
          />
        )}
        <ButtonsContainerInner>
          {step.inputName && (
            <StyledButton
              value={t(step.continueButtonText ?? t('NewBet.Continue'))}
              onClick={() => handleStep(step.continueButton)}
              styleProps={{ width: '100%' }}
              disabled={disableButton}
            />
          )}
          {step.prevButton && (
            <StyledButton
              onClick={() => handleStep(step.prevButton, true)}
              icon={<ArrowRight color={PRIMARY_COLOR} />}
              styleProps={{ width: '32%', backgroundColor: 'white', border: '2px solid #15AB94' }}
            />
          )}
        </ButtonsContainerInner>
      </ButtonsContainer>
    </PageContainer>
  );
};

export default NewBet;
