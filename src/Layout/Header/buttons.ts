import { useTranslation } from 'react-i18next';
import { ButtonConfig } from '@components/Button/StyledButton';
import { DialogType } from '@components/StyledDialog/StyledDialog';
import { ThemeType } from '@theme/theme';
import { PRIMARY_COLOR } from '@theme/colorTheme';

export const createDialogButtons = (
  dialogType: DialogType,
  onConfirm: () => void,
  onClose: () => void,
  onUpdate?: () => void
): ButtonConfig[] => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation();
  const buttons: ButtonConfig[] = [];

  if (dialogType === DialogType.BetCreation || dialogType === DialogType.ReplaceImage) {
    buttons.push({
      value: t(`StyledDialog.${dialogType}ConfimButton`),
      onClick: onConfirm,
      colorVariant: ThemeType.Primary,
    });
  }
  if (dialogType === DialogType.ReplaceImage) {
    buttons.push({
      value: t(`StyledDialog.${dialogType}UpdateButton`),
      onClick: onUpdate,
      colorVariant: ThemeType.Secondary,
      styleProps: { color: '#E33E21' },
    });
  }
  if (dialogType === DialogType.BetCreation) {
    buttons.push({
      value: t(`StyledDialog.${dialogType}CloseButton`),
      onClick: onClose,
      colorVariant: ThemeType.Secondary,
      styleProps: { border: `2px solid ${PRIMARY_COLOR}` },
    });
  }

  return buttons;
};
