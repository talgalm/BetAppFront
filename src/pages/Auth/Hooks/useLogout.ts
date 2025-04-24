import { useMutation, UseMutationResult, useQuery } from '@tanstack/react-query';
import { ApiService, HTTPMethod } from '../../../api/types';

export const useLogout = (): UseMutationResult<void, Error, void> => {
  return useMutation({
    mutationFn: async (): Promise<void> => {
      await ApiService.makeRequest('/auth/logout', HTTPMethod.POST, undefined, true, true, true);

      // 🧹 Remove access & refresh tokens from cookies
      document.cookie = 'accessToken=; Max-Age=0; path=/; SameSite=Strict;';
      document.cookie = 'refreshToken=; Max-Age=0; path=/; SameSite=Strict;';

      // 🧹 Clear React Query persisted cache
      localStorage.removeItem('REACT_QUERY_OFFLINE_CACHE');

      // Optionally redirect or trigger logout flow
      window.location.href = '/';
    },
  });
};
