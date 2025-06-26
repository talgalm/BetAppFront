import { useNavigate } from 'react-router-dom';
import { newBetSteps } from '../pages/NewBet/new-bet-steps';

export const useCleanCreateNewBet = () => {
  const navigate = useNavigate();

  return () => {
    localStorage.removeItem('betForm');
    localStorage.removeItem('NewBetStep');
    Object.entries(newBetSteps).map(([key, value]) => {
      if ('skipToEnd' in value) {
        return [key, { ...value, skipToEnd: null }];
      }
      return [key, value];
    });
    navigate('/home', { state: { fromNewBetCleanup: true } });
  };
};
