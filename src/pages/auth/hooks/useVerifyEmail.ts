import { useMutation } from '@tanstack/react-query';
import { ApiService, HTTPMethod } from '@api/apiService';

export const useVerifyEmail = () => {
  return useMutation<{ verify: boolean }, Error, string>({
    mutationFn: (token: string) => {
      return ApiService.makeRequest<{ verify: boolean }>(
        `/users/verify-email`,
        HTTPMethod.GET,
        { token },
        true
      );
    },
  });
};
