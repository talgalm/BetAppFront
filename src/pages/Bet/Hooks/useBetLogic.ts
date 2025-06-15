import { useAtom } from 'jotai';
import { contactModalDialogAtom, dialogActionAtom } from '../../../Jotai/atoms';
import { useUpdateBet } from './useUpdateBet';
import { useParams } from 'react-router-dom';
import { useBet } from './useBet';
import { useSecondRoundVoting } from './useSecondRoundVoting';
import { User } from '../../../Interfaces';
import { useDeclareWinner } from './useDeclareWinner';
import { useAddSupervisor } from './useAddSupervisor';

interface UseBetLogicProps {
  setOpen: (open: boolean) => void;
}

export const useBetLogic = ({ setOpen }: UseBetLogicProps) => {
  const { mutate: updateBet } = useUpdateBet();
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

  const PickWinnerDialogAction = (winners?: string[]) =>
    declareWinner({
      betId: bet?.id ?? '',
      winners: winners ?? [],
    });
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
