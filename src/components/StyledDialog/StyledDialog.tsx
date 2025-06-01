import { Dialog } from '@mui/material';
import { Typography } from '../Topography/topography';
import { TypographyTypes } from '../Topography/TypographyTypes';
import { ReactComponent as CloseIcon } from '../../Theme/Icons/Close.svg';
import { useTranslation } from 'react-i18next';
import { PopUpContent, PopUpHeader, PopUpRUDiv } from '../../Errors/ErrorHandler.styles';
import ButtonsHub, { ButtonsHubStatus } from '../../pages/ButtonsHub';

import { ButtonConfig } from '../Button/StyledButton';

export enum DialogType {
  BetCreation = 'betCreation',
  BetCreator = 'betCreator',
  BetSupervisor = 'betSupervisor',
}

type ConfirmDialogProps = {
  type: DialogType;
  open: boolean;
  closeModal?: () => void;
  buttons: ButtonConfig[];
};

export const StyledDialog: React.FC<ConfirmDialogProps> = ({ open, type, closeModal, buttons }) => {
  const { t } = useTranslation();

  const title = t(`StyledDialog.${type}Title`);
  const subtitle = t(`StyledDialog.${type}Subtitle`);

  return (
    <Dialog open={open} dir="rtl">
      <PopUpRUDiv>
        <PopUpHeader>
          <CloseIcon onClick={closeModal} />
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
