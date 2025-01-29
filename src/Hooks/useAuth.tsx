import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { User } from '../api/interfaces';
import { ApiService, HTTPMethod } from '../api/types';

interface LoginPayload {
  username: string;
  password: string;
}

interface RegisterPayload extends LoginPayload {
  email: string;
  phoneNumber: string;
}

export const useLogin = (): UseMutationResult<
  { user: User; token: string },
  Error,
  LoginPayload
> => {
  const mutation = useMutation({
    mutationFn: async ({
      username,
      password,
    }: LoginPayload): Promise<{ user: User; token: string }> => {
      const response = await ApiService.makeRequest<{
        user: User;
        token: string;
      }>('/api/users/login', HTTPMethod.POST, { username, password });
      return response;
    },
  });

  return mutation;
};

export const useRegister = (): UseMutationResult<{ user: User }, Error, RegisterPayload> => {
  const mutation = useMutation({
    mutationFn: async ({
      username,
      password,
      email,
      phoneNumber,
    }: RegisterPayload): Promise<{ user: User; token: string }> => {
      const response = await ApiService.makeRequest<{
        user: User;
        token: string;
      }>('/api/users/register', HTTPMethod.POST, {
        username,
        password,
        email,
        phoneNumber,
      });
      return response;
    },
  });

  return mutation;
};
