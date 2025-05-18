import { useNavigate } from 'react-router-dom';

export const useCleanCreateNewBet = () => {
  const navigate = useNavigate();

  return () => {
    localStorage.removeItem('betForm');
    localStorage.removeItem('NewBetStep');
    navigate('/home', { state: { fromNewBetCleanup: true } });
  };
};
