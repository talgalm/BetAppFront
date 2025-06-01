import { useNavigate } from 'react-router';
import { useAtom } from 'jotai';
import { finishBetAtom, layoutEphemeralAtom } from '../../../Jotai/atoms';
import { UserActiveStep } from '../../../Jotai/UserAtoms';
import { authSteps } from '../../../pages/Auth/WelcomePage/interface';
import { useLogout } from '../../../pages/Auth/Hooks/useLogout';
import { useCleanCreateNewBet } from '../../../utils/cleanCreateNewBet';

interface UseBetLogicProps {
  setOpen: (open: boolean) => void;
}

export const useBetLogic = ({ setOpen }: UseBetLogicProps) => {
  const handleCloseModal = () => {
    setOpen(false);
  };

  return {
    handleCloseModal,
  };
};
