import { ButtonConfig } from '@components/Button/StyledButton';
import { NewBetStep, NewBetStepValueTypes } from './new-bet-steps';
import { t } from 'i18next';

export const createNewBetButtons = (
  step: NewBetStep,
  disableButton: boolean,
  handleStep: (
    nextStep: NewBetStepValueTypes | null,
    back?: boolean,
    continueWithout?: NewBetStepValueTypes
  ) => void,
  icon?: React.ReactNode
): ButtonConfig[] => {
  const buttons: ButtonConfig[] = [];

  if (step.inputName) {
    buttons.push({
      value: t(
        step.skipToEnd ? t('NewBet.Save') : (step.continueButtonText ?? t('NewBet.Continue'))
      ),
      onClick: () => handleStep(step.continueButton),
      styleProps: { width: '100%' },
      disabled: disableButton,
    });
  }
  if (step.prevButton) {
    buttons.push({
      icon: icon,
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
