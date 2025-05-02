import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { User } from '../../../Interfaces';
import { ApiService, HTTPMethod } from '../../../API/api';

interface RegisterPayload {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
}

export const useRegister = (): UseMutationResult<{ user: User }, Error, RegisterPayload> => {
  const mutation = useMutation({
    mutationFn: async ({
      fullName,
      password,
      email,
      phoneNumber,
    }: RegisterPayload): Promise<{ user: User }> => {
      const response = await ApiService.makeRequest<{
        user: User;
      }>('/users', HTTPMethod.POST, {
        fullName,
        password,
        email,
        phoneNumber,
      });
      return response;
    },
  });

  return mutation;
};
