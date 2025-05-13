import { useQuery } from '@tanstack/react-query';
import { User } from '../Interfaces';
import { ApiService, HTTPMethod } from '../API/api';

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
