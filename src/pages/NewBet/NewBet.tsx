import {
  ButtonsContainer,
  ButtonsContainerInner,
  CheckboxContainer,
  CheckboxTextContainer,
  HomeDivContainer,
  PageContainer,
  ProgressBarContainer,
} from './NewBet.styles';
import { CreateBetInputs, newBetSteps, NewBetStepValueTypes } from './Interface';
import { useFormContext } from 'react-hook-form';
import StyledButton from '../../components/Button/StyledButton';
import { useAtom } from 'jotai';
import { ActiveStep } from '../../Jotai/newBetAtoms';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ArrowRight } from '../../Theme/Icons/arrowRight.svg';

import { PRIMARY_COLOR } from '../../Theme/ColorTheme';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import { useEffect, useState } from 'react';
import NewBetContent from './NewBetContent/NewBetContent';
import { Checkbox } from '@mui/material';
import { Typography } from '../../components/Topography/topography';
import { TypographyTypes } from '../../components/Topography/TypographyTypes';

const NewBet = () => {
  const [step, setActiveStep] = useAtom(ActiveStep);
  const { t } = useTranslation();
  const { control, handleSubmit, watch, setValue, unregister } = useFormContext<CreateBetInputs>();
  const [targetProgress, setTargetProgress] = useState(0);
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const formValues = watch();

  useEffect(() => {
    if (step.step === NewBetStepValueTypes.Start || step.step === NewBetStepValueTypes.Summary) {
      setDisableButton(false);
      return;
    }

    if (step.step === NewBetStepValueTypes.files) {
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

    if (step.step === NewBetStepValueTypes.betim) {
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
        setValue(key as keyof CreateBetInputs, parsedData[key]);
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

  const onSubmit = (data: CreateBetInputs) => {
    console.log(data);
  };

  const changeNextStep = (checked: boolean) => {
    if (step.step === NewBetStepValueTypes.description) {
      if (checked) {
        step.continueButton = NewBetStepValueTypes.Conditions;
        newBetSteps[NewBetStepValueTypes.betim].prevButton = NewBetStepValueTypes.Conditions;
      } else {
        step.continueButton = NewBetStepValueTypes.betim;
        newBetSteps[NewBetStepValueTypes.betim].prevButton = NewBetStepValueTypes.description;
      }
    }
  };

  return (
    <div
      style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', overflowY: 'hidden' }}
    >
      <ProgressBarContainer marginTop={step.step !== NewBetStepValueTypes.Start ? 50 : 0}>
        {step.step !== NewBetStepValueTypes.Start && (
          <ProgressBar targetProgress={targetProgress} />
        )}
      </ProgressBarContainer>
      <HomeDivContainer marginTop={step.step !== NewBetStepValueTypes.Start ? 100 : 50}>
        <PageContainer>
          <form onSubmit={handleSubmit(onSubmit)}>
            {step.step && (
              <NewBetContent control={control} inputName={step.inputName} type={step.step} />
            )}
          </form>
          {step.step === NewBetStepValueTypes.description && (
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
        </PageContainer>
        <ButtonsContainer>
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
      </HomeDivContainer>
    </div>
  );
};

export default NewBet;
