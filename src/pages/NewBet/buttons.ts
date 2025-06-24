import { ButtonConfig } from '../../components/Button/StyledButton';
import React from 'react';
import { NewBetStep, NewBetStepValueTypes } from './Interface';

type CreateActionButtonsProps = {
  step: NewBetStep;
  handleStep: (
    nextStep: NewBetStepValueTypes | null,
    back?: boolean,
    continueWithout?: NewBetStepValueTypes
  ) => void;
  disableButton: boolean;
  t: (key: string) => string;
  backIcon: React.ReactNode;
};

export const createNewbetButtons = ({
  step,
  handleStep,
  disableButton,
  t,
  backIcon,
}: CreateActionButtonsProps): ButtonConfig[] => {
  const buttons: ButtonConfig[] = [];

  if (step.inputName) {
    buttons.push({
      value: t(step.skipToEnd ? 'NewBet.Save' : (step.continueButtonText ?? 'NewBet.Continue')),
      onClick: () => handleStep(step.continueButton),
      styleProps: { width: '100%' },
      disabled: disableButton,
    });
  }

  if (step.prevButton) {
    buttons.push({
      icon: backIcon,
      onClick: () => handleStep(step.prevButton, true),
      styleProps: {
        width: '32%',
        backgroundColor: 'white',
        border: '2px solid #15AB94',
      },
    });
  }

  return buttons;
};
