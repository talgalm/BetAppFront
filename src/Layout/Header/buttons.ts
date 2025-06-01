import { useTranslation } from 'react-i18next';
import { ButtonConfig } from '../../components/Button/StyledButton';
import { DialogType } from '../../components/StyledDialog/StyledDialog';
import { ThemeType } from '../../Theme/theme';

export const createDialogButtons = (dialogType: DialogType): ButtonConfig[] => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation();
  const buttons: ButtonConfig[] = [];

  if (dialogType === DialogType.BetCreation) {
    buttons.push({
      value: t(`StyledDialog.${dialogType}ConfimButton`),
      // onClick: onConfirm,
      colorVariant: ThemeType.Primary,
    });
    buttons.push({
      value: t(`StyledDialog.${dialogType}CloseButton`),
      // onClick: onClose,
      colorVariant: ThemeType.Secondary,
      styleProps: { border: '2px solid #15AB94' },
    });
  }

  return buttons;
};
