import React, { ReactNode, useEffect, useState } from 'react';
import { useProfile } from '../Hooks/hookQuery/useProfile';
import { userAtom } from '../Jotai/atoms';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router';
import BetLoader from '../Theme/Loader/loader';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useAtom(userAtom);

  // Don't fetch profile again if user is already known
  const shouldFetch = !user;

  const { data, isSuccess, isError, isLoading } = useProfile();

  const [initialized, setInitialized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && isSuccess && data) {
      setUser(data);
    }
    if (isError) {
      setUser(null);
      // optionally navigate('/login')
    }
    if ((isSuccess || isError) && shouldFetch) {
      setInitialized(true);
    }
    if (user) {
      setInitialized(true); // skip loader if already logged in
    }
  }, [user, isSuccess, isError, data, setUser, shouldFetch]);

  if (!initialized && isLoading) {
    return <BetLoader />;
  }

  return <>{children}</>;
};
