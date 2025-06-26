import { Dialog } from '@mui/material';
import { Typography } from '../Topography/typography';
import { TypographyTypes } from '../Topography/TypographyTypes';
import { ReactComponent as CloseIcon } from '@assets/icons/Close.svg';
import { useTranslation } from 'react-i18next';
import { PopUpContent, PopUpHeader, PopUpRUDiv } from '@errors/ErrorHandler.styles';
import ButtonsHub, { ButtonsHubStatus } from '@components/ButtonsHub/ButtonsHub';

import { ButtonConfig } from '../Button/StyledButton';
import { useAtom } from 'jotai';
import { dialogActionAtom } from '@store/dialogAtoms';

export enum DialogType {
  BetCreation = 'betCreation',
  BetCreator = 'betCreator',
  BetSupervisor = 'betSupervisor',
  ReplaceImage = 'replcaeImage',
}

export enum DialogAction {
  SecondRound = 'SecondRoundDialogAction',
  PickWinner = 'PickWinnerDialogAction',
  AddSupervisor = 'AddSupervisorDialogAction',
  Draw = 'DrawDialogAction',
}

type ConfirmDialogProps = {
  type: DialogType;
  open: boolean;
  closeModal?: () => void;
  buttons: ButtonConfig[];
};

export const StyledDialog: React.FC<ConfirmDialogProps> = ({ open, type, closeModal, buttons }) => {
  const { t } = useTranslation();
  const [dialogAction] = useAtom(dialogActionAtom);

  const title = t(`StyledDialog.${dialogAction ?? type}Title`);
  const subtitle = t(`StyledDialog.${dialogAction ?? type}Subtitle`);

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
