import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { ApiService, HTTPMethod } from '../../../api/types';
import { User } from '../../../api/interfaces';

interface LoginPayload {
  Email: string;
  Password: string;
}

export const useLogin = (): UseMutationResult<
  { user: User; token: string },
  Error,
  LoginPayload
> => {
  const mutation = useMutation({
    mutationFn: async ({
      Email,
      Password,
    }: LoginPayload): Promise<{ user: User; token: string }> => {
      const response = await ApiService.makeRequest<{
        user: User;
        token: string;
      }>('/auth/login', HTTPMethod.POST, { Email, Password });
      return response;
    },
  });

  return mutation;
};
