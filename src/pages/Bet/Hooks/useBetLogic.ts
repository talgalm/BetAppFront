import { useAtom } from 'jotai';
import { contactModalDialogAtom, dialogActionAtom, finishBetAtom } from '../../../Jotai/atoms';
import { UpdateBetAdditionalAction, useUpdateBet } from './useUpdateBet';
import { useParams } from 'react-router-dom';
import { useBet } from './useBet';
import { useSecondRoundVoting } from './useSecondRoundVoting';
import { User } from '../../../Interfaces';
import { useDeclareWinner } from './useDeclareWinner';

interface UseBetLogicProps {
  setOpen: (open: boolean) => void;
}

export const useBetLogic = ({ setOpen }: UseBetLogicProps) => {
  const { mutate: updateBet } = useUpdateBet();
  const { mutate: secondRoundVoting } = useSecondRoundVoting();
  const { mutate: declareWinner } = useDeclareWinner();
  const { id } = useParams();
  const { data: bet } = useBet(id);
  const [, SetFinishBet] = useAtom(finishBetAtom);
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

    updateBet({
      betId: bet.id,
      data: { supervisor },
    });
  };

  const pickSingleWinner = (singleWinner: string) =>
    declareWinner({
      betId: bet?.id ?? '',
      winners: [singleWinner],
    });
  const DrawDialogAction = () => {
    setOpen(false);
    SetFinishBet({
      isFinished: false,
      mode: 'single',
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
