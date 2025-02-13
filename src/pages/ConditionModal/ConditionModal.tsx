import { Dialog, Box } from '@mui/material';
import { Typography } from '../../components/Topography/topography';
import { TypographyTypes } from '../../Theme/Typography/typography';
import { DialogContainer } from './ConditionModal.styles';

interface ConditionModalProps {
  open: boolean;
  handleClose: () => void;
}

const ConditionModal: React.FC<ConditionModalProps> = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContainer></DialogContainer>
    </Dialog>
  );
};

export default ConditionModal;
