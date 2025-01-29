import { useQuery } from '@tanstack/react-query';
import { User } from '../api/interfaces';
import { ApiService, HTTPMethod } from '../api/types';

interface UserResponse {
  user: User;
}

export const UseUser = (username: string) => {
  return useQuery<UserResponse, Error>({
    queryKey: ['user', username],
    queryFn: async () => {
      return ApiService.makeRequest<UserResponse>(
        '/api/users/get',
        HTTPMethod.POST,
        { username },
        true
      );
    },
    enabled: !!username,
  });
};
