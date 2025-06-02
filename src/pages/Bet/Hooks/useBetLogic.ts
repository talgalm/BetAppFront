import { useAtom } from 'jotai';
import { finishBetAtom } from '../../../Jotai/atoms';
import { useUpdateBet } from './useUpdateBet';

interface UseBetLogicProps {
  setOpen: (open: boolean) => void;
}

export const useBetLogic = ({ setOpen }: UseBetLogicProps) => {
  const { mutate: updateBet } = useUpdateBet();
  const [, SetFinishBet] = useAtom(finishBetAtom);
  const handleCloseModal = () => {
    setOpen(false);
  };

  const secondRoundVoting = () =>
    updateBet({
      betId: '',
      data: {},
    });

  const multiWinners = () =>
    updateBet({
      betId: '',
      data: { delareWinners: true },
    });
  const addSupervisor = () =>
    updateBet({
      betId: '',
      data: {},
    });

  const pickSingleWinner = (singleWinner: string) =>
    updateBet({
      betId: '',
      data: { singleWinner },
    });
  const pickWinnerOption = () => {
    setOpen(false);
    SetFinishBet({
      isFinished: false,
      mode: 'single',
    });
  };

  return {
    handleCloseModal,
    secondRoundVoting,
    multiWinners,
    addSupervisor,
    pickWinnerOption,
    pickSingleWinner,
  };
};
