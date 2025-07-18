import { useAtom } from 'jotai';
import { useParams } from 'react-router-dom';
import { User } from '@interfaces/User.interface';
import { dialogActionAtom, contactModalDialogAtom } from '@store/dialogAtoms';
import { useAddSupervisor } from './useAddSupervisor';
import { useBet } from './useBet';
import { useDeclareWinner } from './useDeclareWinner';
import { useSecondRoundVoting } from './useSecondRoundVoting';

interface UseBetLogicProps {
  setOpen: (open: boolean) => void;
}

export const useBetLogic = ({ setOpen }: UseBetLogicProps) => {
  const { mutate: secondRoundVoting } = useSecondRoundVoting();
  const { mutate: declareWinner } = useDeclareWinner();
  const { mutate: addSupervisor } = useAddSupervisor();
  const { id } = useParams();
  const { data: bet } = useBet(id);
  const [, setDialogAction] = useAtom(dialogActionAtom);
  const [, setContactDialog] = useAtom(contactModalDialogAtom);

  const handleCloseModal = () => {
    setDialogAction(null);
    setOpen(false);
  };

  const SecondRoundDialogAction = () =>
    secondRoundVoting({
      betId: bet?.id ?? '',
    });

  const PickWinnerDialogAction = () => {
    declareWinner({
      betId: bet?.id ?? '',
    });
    handleCloseModal();
  };

  const AddSupervisorDialogAction = () => {
    setContactDialog(true);
    setOpen(false);
  };
  const AddSupervisor = (supervisor: User) => {
    if (!bet?.id) return;

    addSupervisor({ betId: bet.id, phoneNumber: supervisor.phoneNumber, userId: supervisor.id });
  };

  const pickSingleWinner = (singleWinner: string) =>
    declareWinner({
      betId: bet?.id ?? '',
      winners: [singleWinner],
    });
  const DrawDialogAction = () => {
    declareWinner({
      betId: bet?.id ?? '',
    });
    handleCloseModal();
  };

  return {
    handleCloseModal,
    SecondRoundDialogAction,
    PickWinnerDialogAction,
    AddSupervisorDialogAction,
    DrawDialogAction,
    pickSingleWinner,
    AddSupervisor,
  };
};
