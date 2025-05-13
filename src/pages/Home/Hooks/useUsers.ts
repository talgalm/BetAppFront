import { useQuery } from '@tanstack/react-query';
import { ApiService, HTTPMethod } from '../../../API/api';
import { User } from '../../../Interfaces';

export const useUsers = (options?: { enabled?: boolean }) => {
  return useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: async () => {
      return ApiService.makeRequest<User[]>('/users', HTTPMethod.GET, undefined, true, true);
    },
    enabled: options?.enabled ?? true,
  });
};
