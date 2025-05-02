import React, { ReactNode, useEffect, useState } from 'react';
import { useProfile } from './useProfile';
import { userAtom } from '../Jotai/atoms';
import { useAtom } from 'jotai';
import BetLoader from '../Theme/Loader/loader';
import ErrorFallback from '../Errors/ErrorHandler';
import { ERROR_MESSAGES, ErrorTypes } from '../Errors/interface';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useAtom(userAtom);
  const shouldFetch = !user;

  const { data, isSuccess, isError, isLoading } = useProfile();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!user && isSuccess && data) {
      setUser(data);
    }
    if (isError) {
      setUser(null);
    }
    if ((isSuccess || isError) && shouldFetch) {
      setInitialized(true);
    }
    if (user) {
      setInitialized(true);
    }
  }, [user, isSuccess, isError, data, setUser, shouldFetch]);

  if (!initialized && isLoading) {
    return <BetLoader />;
  }

  const handleError = () => {
    if (user) {
      window.location.href = '/home';
    } else {
      window.location.href = '/';
    }
  };

  if (isError && !user) {
    return (
      <ErrorFallback
        error={ERROR_MESSAGES[ErrorTypes.ConnectionError]}
        resetErrorBoundary={handleError}
      />
    );
  }

  return <>{children}</>;
};
