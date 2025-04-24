import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { ApiService, HTTPMethod } from '../../../api/types';
import { Tokens } from '../../../api/interfaces';

interface LoginPayload {
  email: string;
  password: string;
}

export const useLogin = (): UseMutationResult<{ tokens: Tokens }, Error, LoginPayload> => {
  const mutation = useMutation({
    mutationFn: async ({ email, password }: LoginPayload): Promise<{ tokens: Tokens }> => {
      const response = await ApiService.makeRequest<{
        tokens: Tokens;
      }>('/auth/login', HTTPMethod.POST, { email, password });
      return response;
    },
  });

  return mutation;
};
