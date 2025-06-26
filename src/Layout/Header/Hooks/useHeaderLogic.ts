import { useNavigate } from 'react-router';
import { useAtom } from 'jotai';
import { UserActiveStep } from '@store/authStepAtom';
import { authSteps } from '@pages/auth/welcome-page/auth-steps';
import { useLogout } from '@pages/auth/Hooks/useLogout';
import { useCleanCreateNewBet } from '@hooks/cleanCreateNewBet';
import { useQueryClient } from '@tanstack/react-query';
import { CreateBetInputs, useCreateBet } from '@pages/NewBet/Hooks/useCreatebet';
import { User } from '@interfaces/User.interface';
import { BetStatus } from '@interfaces/Bet.interface';
import { layoutEphemeralAtom } from '@store/layoutAtoms';
import { finishBetAtom } from '@store/betAtoms';
import { contactModalDialogAtom } from '@store/dialogAtoms';

interface UseHeaderLogicProps {
  setOpen: (open: boolean) => void;
}

export const useHeaderLogic = ({ setOpen }: UseHeaderLogicProps) => {
  const navigate = useNavigate();
  const [authStep, setActiveStepAuth] = useAtom(UserActiveStep);
  const [finishBet, SetFinishBet] = useAtom(finishBetAtom);
  const [layoutEphemeral, setLayout] = useAtom(layoutEphemeralAtom);
  const [contactDialog, setContactDialog] = useAtom(contactModalDialogAtom);
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(['user-profile']);
  const createBet = useCreateBet();

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
    if (contactDialog) {
      setContactDialog(false);
      return;
    }
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
    const data = localStorage.getItem('betForm');
    if (data) {
      try {
        const parsedData = JSON.parse(data) as CreateBetInputs;
        parsedData.creator = user?.id || '';
        parsedData.Status = BetStatus.DRAFT;
        createBet.mutate(parsedData, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user-profile'] });
            handleConfirmExit();
          },
          onError: (err) => {
            console.error('Failed to create bet:', err.message);
          },
        });
      } catch (e) {
        console.error('Invalid draft data in localStorage', e);
      }
    }
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
