import React, { ReactNode, useEffect, useState } from 'react';
import { useProfile } from './useProfile';
import { userAtom } from '../Jotai/atoms';
import { useAtom } from 'jotai';
import BetLoader from '../Theme/Loader/loader';
import ErrorFallback from '../Errors/ErrorHandler';
import { ERROR_MESSAGES, ErrorTypes } from '../Errors/interface';
import { useLocation, useNavigate } from 'react-router-dom';

const useAuthInit = () => {
  const [user, setUser] = useAtom(userAtom);
  const { data, isSuccess, isError, isLoading } = useProfile();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!user && isSuccess && data) {
      setUser(data);
    }
    if (isError) {
      setUser(null);
    }
    if ((isSuccess || isError || user) && !initialized) {
      setInitialized(true);
    }
  }, [user, isSuccess, isError, data, setUser, initialized]);

  return { user, initialized, isError, isLoading };
};

const AuthCheck = ({ children }: { children: ReactNode }) => {
  const [user] = useAtom(userAtom);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && location.pathname === '/') {
      navigate('/home', { replace: true });
    }
  }, [user, location.pathname, navigate]);

  return <>{children}</>;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const { user, initialized, isError, isLoading } = useAuthInit();

  if (!initialized && isLoading) {
    return <BetLoader />;
  }

  const handleError = () => {
    if (user) {
      navigate('/home');
    } else {
      navigate('/');
    }
  };

  if (isError && user !== null) {
    return (
      <ErrorFallback
        error={ERROR_MESSAGES[ErrorTypes.AuthError]}
        resetErrorBoundary={handleError}
      />
    );
  }

  return <AuthCheck>{children}</AuthCheck>;
};
