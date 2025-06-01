import { Dialog } from '@mui/material';
import { Typography } from '../Topography/topography';
import { TypographyTypes } from '../Topography/TypographyTypes';
import { ReactComponent as CloseIcon } from '../../Theme/Icons/Close.svg';
import { useTranslation } from 'react-i18next';
import { PopUpContent, PopUpHeader, PopUpRUDiv } from '../../Errors/ErrorHandler.styles';
import ButtonsHub, { ButtonsHubStatus } from '../../pages/ButtonsHub';
import { ThemeType } from '../../Theme/theme';
import { ButtonConfig } from '../Button/StyledButton';

export enum DialogType {
  BetCreation = 'betCreation',
  BetCreator = 'betcreator',
  BetSupervisor = 'betsupervisor',
}

type ConfirmDialogProps = {
  type?: DialogType;
  open: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  onAbort?: () => void;
};

export const StyledDialog: React.FC<ConfirmDialogProps> = ({
  open,
  type,
  onClose,
  onConfirm,
  onAbort,
}) => {
  const { t } = useTranslation();

  const title = t(`StyledDialog.${type}Title`);
  const subtitle = t(`StyledDialog.${type}Subtitle`);

  const buttons: ButtonConfig[] = [
    {
      value: t(`StyledDialog.${type}ConfimButton`),
      onClick: onConfirm,
      colorVariant: ThemeType.Primary,
    },
    {
      value: t(`StyledDialog.${type}CloseButton`),
      onClick: onClose,
      colorVariant: ThemeType.Secondary,
      styleProps: { border: '2px solid #15AB94' },
    },
  ];

  return (
    <Dialog open={open} onClose={onClose} dir="rtl">
      <PopUpRUDiv>
        <PopUpHeader>
          <CloseIcon onClick={onAbort} />
        </PopUpHeader>

        <PopUpContent>
          <Typography value={title} variant={TypographyTypes.H3} styleProps={{ color: 'black' }} />
          <Typography
            value={subtitle}
            variant={TypographyTypes.TextMedium}
            styleProps={{ color: 'black' }}
          />
        </PopUpContent>

        <ButtonsHub type={ButtonsHubStatus.COLUMN} buttons={buttons} />
      </PopUpRUDiv>
    </Dialog>
  );
};
