import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthCallback() {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem('AuthStep');
    navigate('/home');
  }, [navigate]);
  return null;
}

export default AuthCallback;
