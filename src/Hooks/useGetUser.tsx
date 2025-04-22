import { useQuery } from '@tanstack/react-query';
import { User } from '../api/interfaces';
import { ApiService, HTTPMethod } from '../api/types';

export const useUser = (id: string) => {
  return useQuery<User, Error>({
    queryKey: ['user', id],
    queryFn: async () => {
      return ApiService.makeRequest<User>(`/users/${id}`, HTTPMethod.GET, undefined, true);
    },
    enabled: !!id,
  });
};

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
