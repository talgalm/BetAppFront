import { ButtonConfig } from '@components/Button/StyledButton';
import { NewBetStep, NewBetStepValueTypes } from './new-bet-steps';
import { t } from 'i18next';
import { PRIMARY_GREEN } from '@theme/colorTheme';
import { ThemeType } from '@theme/theme';

export const createNewBetButtons = (
  step: NewBetStep,
  disableButton: boolean,
  handleStep: (
    nextStep: NewBetStepValueTypes | null,
    back?: boolean,
    continueWithout?: NewBetStepValueTypes
  ) => void,
  handleBet?: () => void,
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
        border: `2px solid ${PRIMARY_GREEN}`,
      },
    });
  }

  if (step.step === NewBetStepValueTypes.Success && handleBet) {
    buttons.push({
      value: t('NewBet.WatchBet'),
      onClick: handleBet,
      colorVariant: ThemeType.Secondary,
    });
  }

  return buttons;
};
