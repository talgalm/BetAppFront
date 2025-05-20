import { Dialog } from '@mui/material';
import { Typography } from '../Topography/topography';
import { TypographyTypes } from '../Topography/TypographyTypes';
import { ReactComponent as CloseIcon } from '../../Theme/Icons/Close.svg';
import { useTranslation } from 'react-i18next';
import {
  ButtonsContainer,
  PopUpContent,
  PopUpHeader,
  PopUpRUDiv,
} from '../../Errors/ErrorHandler.styles';
import { ThemeType } from '../../Theme/theme';
import StyledButton from '../Button/StyledButton';

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
            value={'לסיים פתיחת ההתערבות ?'}
            variant={TypographyTypes.H3}
            styleProps={{ color: 'black' }}
          />
          <Typography
            value={'אם תסגור כעת, ההתערבות לא תישמר וכל הנתונים שהזנת יימחקו'}
            variant={TypographyTypes.TextMedium}
            styleProps={{ color: 'black' }}
          />
        </PopUpContent>
        <ButtonsContainer>
          <StyledButton
            value={'לסגור בלי לשמור'}
            colorVariant={ThemeType.Primary}
            onClick={onConfirm}
          />
          <StyledButton
            value={'שמירה כטיוטה'}
            colorVariant={ThemeType.Secondary}
            styleProps={{ border: '2px solid #15AB94' }}
            onClick={onClose}
          />
        </ButtonsContainer>
      </PopUpRUDiv>
    </Dialog>
  );
};
