import { useProfile } from '../useProfile';

export const useAuth = () => {
  const query = useProfile();
  const initialized = query.isSuccess || query.isError;

  return {
    user: query.data ?? null,
    initialized,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
