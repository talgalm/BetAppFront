import React, { ReactNode, useEffect, useState } from 'react';
import { useProfile } from './useProfile';
import { userAtom } from '../Jotai/atoms';
import { useAtom } from 'jotai';
import BetLoader from '../Theme/Loader/loader';
import ErrorFallback, { ErrorHandler } from '../Errors/ErrorHandler';
import { ERROR_MESSAGES, ErrorTypes } from '../Errors/interface';
import { useLocation, useNavigate } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';

const useAuthInit = () => {
  const [user, setUser] = useAtom(userAtom);
  const { data, isSuccess, isError, isLoading, error } = useProfile();
  const [initialized, setInitialized] = useState(false);
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    if (!user && isSuccess && data) {
      setUser(data);
    }
    if (isError) {
      if (error.message === 'Network Error') ErrorHandler(showBoundary, ErrorTypes.ConnectionError);
      console.log(error);
      console.log('!');
      setUser(null);
    }
    if ((isSuccess || isError || user) && !initialized) {
      setInitialized(true);
    }
  }, [user, isSuccess, isError, data, setUser, initialized, showBoundary, error]);

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
    console.log('0');
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
