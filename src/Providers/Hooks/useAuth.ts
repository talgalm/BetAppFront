import { useProfile } from '../useProfile';

export const useAuth = (enabled = true) => {
  // Always call the hook — conditionally disable it
  const query = useProfile(enabled);

  const initialized = enabled ? query.isSuccess || query.isError : true;

  return {
    user: query.data ?? null,
    initialized,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
