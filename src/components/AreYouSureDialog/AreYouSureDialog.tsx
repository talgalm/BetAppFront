import { Dialog } from '@mui/material';
import { Typography } from '../Topography/topography';
import { TypographyTypes } from '../Topography/TypographyTypes';
import { ReactComponent as CloseIcon } from '../../Theme/Icons/Close.svg';
import { useTranslation } from 'react-i18next';
import { PopUpContent, PopUpHeader, PopUpRUDiv } from '../../Errors/ErrorHandler.styles';
import ButtonsHub from '../../pages/ButtonsHub';

type ConfirmDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const AreYouSureDialog: React.FC<ConfirmDialogProps> = ({ open, onClose, onConfirm }) => {
  const { t } = useTranslation();
  return (
    <Dialog open={open} onClose={onClose} dir="rtl">
      <PopUpRUDiv>
        <PopUpHeader>
          <CloseIcon onClick={onClose} />
        </PopUpHeader>
        <PopUpContent>
          <Typography
            value={t('AreYouSureDialog.Title')}
            variant={TypographyTypes.H3}
            styleProps={{ color: 'black' }}
          />
          <Typography
            value={t('AreYouSureDialog.Subtitle')}
            variant={TypographyTypes.TextMedium}
            styleProps={{ color: 'black' }}
          />
        </PopUpContent>
        <ButtonsHub
          type="relative"
          textButtonUp={t('AreYouSureDialog.ConfimButton')}
          onClickButtonUp={onConfirm}
          textButtonDown={t('AreYouSureDialog.CloseButton')}
          onClickButtonDown={onClose}
          propsOverrideButtonsDown={{ border: '2px solid #15AB94' }}
        />
      </PopUpRUDiv>
    </Dialog>
  );
};
