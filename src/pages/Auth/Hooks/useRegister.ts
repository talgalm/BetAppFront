import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { User } from '../../../api/interfaces';
import { ApiService, HTTPMethod } from '../../../api/types';

interface RegisterPayload {
  Email: string;
  Password: string;
  FullName: string;
  PhoneNumber: string;
}

export const useRegister = (): UseMutationResult<{ user: User }, Error, RegisterPayload> => {
  const mutation = useMutation({
    mutationFn: async ({
      FullName,
      Password,
      Email,
      PhoneNumber,
    }: RegisterPayload): Promise<{ user: User }> => {
      const response = await ApiService.makeRequest<{
        user: User;
      }>('/users', HTTPMethod.POST, {
        FullName,
        Password,
        Email,
        PhoneNumber,
      });
      return response;
    },
  });

  return mutation;
};
