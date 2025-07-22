import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { ApiService, HTTPMethod } from '@api/apiService';

export const useLogout = (): UseMutationResult<void, Error, void> => {
  const queryClient = useQueryClient(); // ←  access the singleton cache

  return useMutation({
    mutationFn: async (): Promise<void> => {
      /* ---- server‑side logout ---- */
      await ApiService.makeRequest('/auth/logout', HTTPMethod.POST, undefined, true, true);

      /* ---- drop auth cookies ---- */
      document.cookie = 'accessToken=; Max-Age=0; path=/; SameSite=Strict;';
      document.cookie = 'refreshToken=; Max-Age=0; path=/; SameSite=Strict;';

      /* ---- clear React‑Query caches ---- */
      queryClient.removeQueries({ queryKey: ['user-profile'] });
      queryClient.clear(); // (optional) nuke everything in memory

      /* ---- clear persisted storage ---- */
      localStorage.clear();
      sessionStorage.clear();

      /* ---- redirect to login ---- */
      window.location.href = '/';
    },
  });
};
