import { useAtom } from 'jotai';
import { dialogActionAtom, finishBetAtom } from '../../../Jotai/atoms';
import { useUpdateBet } from './useUpdateBet';

interface UseBetLogicProps {
  setOpen: (open: boolean) => void;
}

export const useBetLogic = ({ setOpen }: UseBetLogicProps) => {
  const { mutate: updateBet } = useUpdateBet();
  const [, SetFinishBet] = useAtom(finishBetAtom);
  const [, setDialogAction] = useAtom(dialogActionAtom);
  const handleCloseModal = () => {
    setDialogAction(null);
    setOpen(false);
  };

  const SecondRoundDialogAction = () =>
    updateBet({
      betId: '',
      data: {},
    });

  const PickWinnerDialogAction = () =>
    updateBet({
      betId: '',
      data: { delareWinners: true },
    });
  const AddSupervisorDialogAction = () =>
    updateBet({
      betId: '',
      data: {},
    });

  const pickSingleWinner = (singleWinner: string) =>
    updateBet({
      betId: '',
      data: { singleWinner },
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
  };
};
