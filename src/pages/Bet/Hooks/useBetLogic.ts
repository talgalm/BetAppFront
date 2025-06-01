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
  const pickWinner = () => {
    SetFinishBet(false);
  };

  return {
    handleCloseModal,
    secondRoundVoting,
    multiWinners,
    addSupervisor,
    pickWinner,
  };
};
