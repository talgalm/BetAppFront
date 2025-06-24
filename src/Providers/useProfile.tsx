import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ApiService, HTTPMethod } from '../API/api';
import { User } from '../Interfaces/User.interface';

type ProfileOptions = Omit<
  UseQueryOptions<User | null, Error, User | null>,
  'queryKey' | 'queryFn'
>;

export const useProfile = (enabled = true, options?: ProfileOptions) =>
  useQuery<User | null, Error, User | null>({
    queryKey: ['user-profile'],
    queryFn: async () => {
      try {
        return await ApiService.makeRequest<User>(
          '/auth/profile',
          HTTPMethod.GET,
          undefined,
          true,
          true
        );
      } catch (err: any) {
        if (err?.status === 401) return null;
        throw err;
      }
    },
    enabled,
    retry: 1,
    staleTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchInterval: 15 * 60 * 1000,
    refetchIntervalInBackground: true,
    ...options,
  });
