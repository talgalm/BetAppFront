import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BetLoader from '../../Theme/Loader/loader';
import { useAtom } from 'jotai';
import { userAtom } from '../../Jotai/atoms';
import { useProfile } from '../../Hooks/hookQuery/useProfile';

function AuthSuccess() {
  const navigate = useNavigate();
  const [user, setUser] = useAtom(userAtom);
  const { data, isSuccess, isError, isLoading } = useProfile();

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data);
      localStorage.removeItem('AuthStep');
      navigate('/home');
    }
  }, [isSuccess, data, navigate, setUser]);

  if (isLoading) return <BetLoader />;
  if (isError) return <div>Something went wrong during authentication.</div>;

  return null;
}

export default AuthSuccess;
