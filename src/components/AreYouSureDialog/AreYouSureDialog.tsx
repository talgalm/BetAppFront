// components/ConfirmDialog.tsx
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Typography } from '../Topography/topography';
import { TypographyTypes } from '../Topography/TypographyTypes';
import { useTranslation } from 'react-i18next';

type ConfirmDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const AreYouSureDialog: React.FC<ConfirmDialogProps> = ({ open, onClose, onConfirm }) => {
  const { t } = useTranslation();
  return (
    <Dialog open={open} onClose={onClose} dir="rtl">
      <DialogTitle>
        <Typography
          value={'מה, נלחצת ?'}
          variant={TypographyTypes.H1}
          styleProps={{ color: 'black' }}
        />
      </DialogTitle>
      <DialogContent style={{ gap: 15, display: 'flex', flexDirection: 'column' }}>
        <Typography
          value={'התחלת התערבות בהתלהבות, ואז נמאס לך באמצע ? נשמע מוכר'}
          variant={TypographyTypes.TextMedium}
          styleProps={{ color: 'black' }}
        />
        <Typography
          value={'אולי תפתיע ותסיים פעם אחת משהו ?'}
          variant={TypographyTypes.TextSmall}
          styleProps={{ color: 'black' }}
        />
      </DialogContent>
      <DialogActions style={{ gap: 20, display: 'flex', justifyContent: 'center' }}>
        <Typography
          value={'וואלה שכנעת'}
          variant={TypographyTypes.Button}
          styleProps={{ color: '#15AB94' }}
          onClick={onClose}
        />
        <Typography
          value={'עזוב אותי יזין'}
          variant={TypographyTypes.Button}
          styleProps={{ color: '#E33E21' }}
          onClick={onConfirm}
        />
      </DialogActions>
    </Dialog>
  );
};
