import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { User } from '../Interfaces';
import { ApiService, HTTPMethod } from '../API/api';

type ProfileOptions = Omit<
  UseQueryOptions<User | null, Error, User | null, ['user-profile']>,
  'queryKey' | 'queryFn'
>;

/**
 * Fetch the logged‑in user’s profile.
 * Returns `null` if unauthorized (401).
 * @param enabled   – turn the request on/off                (default: true)
 * @param options   – extra React‑Query options (onSuccess, staleTime, …)
 */
export const useProfile = (enabled = true, options?: ProfileOptions) =>
  useQuery<User | null, Error, User | null, ['user-profile']>({
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
        if (err?.status === 401) return null; // not logged in
        throw err;
      }
    },
    enabled,
    retry: 1,
    staleTime: 10 * 60 * 1000, // 10min fresh window
    refetchOnMount: false, // don’t flicker on page swaps
    refetchInterval: 15 * 60 * 1000, // silent 15min polling
    refetchIntervalInBackground: true,
    ...options, // callers can override
  });
