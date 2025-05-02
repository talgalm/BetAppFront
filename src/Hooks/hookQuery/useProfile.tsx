import { useQuery } from '@tanstack/react-query';
import { User } from '../../api/interfaces';
import { ApiService, HTTPMethod } from '../../api/types';

export const useUser = (id: string) => {
  return useQuery<User, Error>({
    queryKey: ['user', id],
    queryFn: async () => {
      return ApiService.makeRequest<User>(`/users/${id}`, HTTPMethod.GET, undefined, true, true);
    },
    enabled: !!id,
  });
};

export const useProfile = (enabled = true) => {
  return useQuery<User, Error>({
    queryKey: ['user-profile'],
    queryFn: async () => {
      return ApiService.makeRequest<User>(`/auth/profile`, HTTPMethod.GET, undefined, true, true);
    },
    enabled,
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: 'always',
  });
};
