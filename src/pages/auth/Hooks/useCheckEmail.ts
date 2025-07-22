import { useQuery } from '@tanstack/react-query';
import { ApiService, HTTPMethod } from '@api/apiService';

export const useCheckEmail = (email: string) => {
  return useQuery<{ exists: boolean }, Error>({
    queryKey: ['check-email', email],
    queryFn: async () => {
      return ApiService.makeRequest<{ exists: boolean }>(
        `/users/check-email?email=${encodeURIComponent(email)}`,
        HTTPMethod.GET,
        undefined,
        true
      );
    },
    enabled: !!email,
  });
};
