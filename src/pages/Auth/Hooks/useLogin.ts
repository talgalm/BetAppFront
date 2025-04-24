import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { ApiService, HTTPMethod } from '../../../api/types';

interface LoginPayload {
  email: string;
  password: string;
}

export const useLogin = (): UseMutationResult<{ accessToken: string }, Error, LoginPayload> => {
  const mutation = useMutation({
    mutationFn: async ({ email, password }: LoginPayload): Promise<{ accessToken: string }> => {
      const response = await ApiService.makeRequest<{
        accessToken: string;
      }>('/auth/login', HTTPMethod.POST, { email, password }, false, false, true);
      document.cookie = `accessToken=${response.accessToken}; path=/; SameSite=Strict;`;

      return response;
    },
  });

  return mutation;
};
