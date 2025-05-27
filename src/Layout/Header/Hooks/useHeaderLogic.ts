import { useNavigate } from 'react-router';
import { useAtom } from 'jotai';
import { finishBetAtom, layoutEphemeralAtom } from '../../../Jotai/atoms';
import { UserActiveStep } from '../../../Jotai/UserAtoms';
import { authSteps } from '../../../pages/Auth/WelcomePage/interface';
import { useLogout } from '../../../pages/Auth/Hooks/useLogout';
import { useCleanCreateNewBet } from '../../../utils/cleanCreateNewBet';

interface UseHeaderLogicProps {
  setOpen: (open: boolean) => void;
}

export const useHeaderLogic = ({ setOpen }: UseHeaderLogicProps) => {
  const navigate = useNavigate();
  const [authStep, setActiveStepAuth] = useAtom(UserActiveStep);
  const [finishBet, SetFinishBet] = useAtom(finishBetAtom);
  const [layoutEphemeral, setLayout] = useAtom(layoutEphemeralAtom);
  const { mutate: logout } = useLogout();
  const cleanNewBet = useCleanCreateNewBet();

  const handleNextStep = () => {
    if (authStep.prev) {
      setActiveStepAuth(authSteps[authStep.prev]);
    } else if (finishBet) {
      SetFinishBet(null);
    } else {
      navigate('/home');
    }
  };

  const handleLogout = () => {
    logout();
  };

  const handleNewBetExit = () => {
    if (!layoutEphemeral?.overlay) {
      setOpen(true);
      return;
    }
    layoutEphemeral.overlay();
    setLayout({ overlay: undefined });
  };

  const handleConfirmExit = () => {
    cleanNewBet();
    setOpen(false);
  };

  const handleCancelExit = () => {
    setOpen(false);
  };

  const handleSaveAsDraft = () => {
    console.log('');
  };

  return {
    handleNextStep,
    handleLogout,
    handleNewBetExit,
    handleConfirmExit,
    handleCancelExit,
    handleSaveAsDraft,
  };
};
