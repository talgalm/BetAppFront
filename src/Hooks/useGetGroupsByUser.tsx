import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { ApiService, HTTPMethod } from '../api/types';
import { Group } from '../api/interfaces';

export const useGetGroupsByUser = (username: string) => {
  const data: UseQueryResult<Group[]> = useQuery({
    queryKey: ['groups', username],
    queryFn: () =>
      ApiService.makeRequest<Group[]>(`/api/groups/getByUser/${username}`, HTTPMethod.GET, {}),
    enabled: Boolean(username),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return {
    groups: data.data,
    ...data,
  };
};
