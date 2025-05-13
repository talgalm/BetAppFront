import { useQuery } from '@tanstack/react-query';
import { ApiService, HTTPMethod } from '../../../API/api';
import { User } from '../../../Interfaces';

export const useMostActives = () => {
  return useQuery<User[], Error>({
    queryKey: ['most-actives'],
    queryFn: async () => {
      return ApiService.makeRequest<User[]>(
        `/users/most-actives`,
        HTTPMethod.GET,
        undefined,
        true,
        true
      );
    },
  });
};
