import { useMutation, UseMutationResult, useQuery } from '@tanstack/react-query';
import { User } from '../../api/interfaces';
import { ApiService, HTTPMethod } from '../../api/types';
import { tokenAtom } from '../../Jotai/atoms';

export const useUser = (id: string) => {
  return useQuery<User, Error>({
    queryKey: ['user', id],
    queryFn: async () => {
      return ApiService.makeRequest<User>(`/users/${id}`, HTTPMethod.GET, undefined, true, 'token');
    },
    enabled: !!id,
  });
};
