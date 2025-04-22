import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { User } from '../../../api/interfaces';
import { ApiService, HTTPMethod } from '../../../api/types';

interface TokenPayload {
  Provider: string;
  Token?: string;
  UserData?: User;
}

export const useRegisterProvider = (): UseMutationResult<
  { user: User; accessToken: string; initial?: boolean },
  Error,
  TokenPayload
> => {
  const mutation = useMutation({
    mutationFn: async ({
      Token,
      Provider,
    }: TokenPayload): Promise<{ user: User; accessToken: string; initial?: boolean }> => {
      const response = await ApiService.makeRequest<{
        user: User;
        accessToken: string;
        initial?: boolean;
      }>('/users/auth', HTTPMethod.POST, {
        Token,
        Provider,
      });
      return response;
    },
  });

  return mutation;
};
