import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { User } from '../api/interfaces';
import { ApiService, HTTPMethod } from '../api/types';

interface LoginPayload {
  FullName: string;
  Password: string;
}

interface RegisterPayload extends LoginPayload {
  Email: string;
  PhoneNumber: string;
}

interface TokenPayload {
  Provider: string;
  Token?: string;
  UserData?: User;
}

interface PartialUserPayload {
  id: string;
  FullName?: string;
  Password?: string;
  Email?: string;
  PhoneNumber?: string;
  Image?: File;
}

export const useLogin = (): UseMutationResult<
  { user: User; token: string },
  Error,
  LoginPayload
> => {
  const mutation = useMutation({
    mutationFn: async ({
      FullName,
      Password,
    }: LoginPayload): Promise<{ user: User; token: string }> => {
      const response = await ApiService.makeRequest<{
        user: User;
        token: string;
      }>('/api/users/login', HTTPMethod.POST, { FullName, Password });
      return response;
    },
  });

  return mutation;
};

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

export const useRegisterProvider = (): UseMutationResult<
  { user: User; accses_toekn: string },
  Error,
  TokenPayload
> => {
  const mutation = useMutation({
    mutationFn: async ({
      Token,
      Provider,
    }: TokenPayload): Promise<{ user: User; accses_toekn: string }> => {
      const response = await ApiService.makeRequest<{
        user: User;
        accses_toekn: string;
      }>('/users/auth', HTTPMethod.POST, {
        Token,
        Provider,
      });
      return response;
    },
  });

  return mutation;
};

export const useUpdateUser = (): UseMutationResult<{ user: User }, Error, PartialUserPayload> => {
  const mutation = useMutation({
    mutationFn: async (data: PartialUserPayload): Promise<{ user: User }> => {
      const { id, ...fieldsToUpdate } = data;

      const response = await ApiService.makeRequest<{ user: User }>(
        `/users/${id}`,
        HTTPMethod.PATCH,
        fieldsToUpdate
      );

      return response;
    },
  });

  return mutation;
};
