import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { ApiService, HTTPMethod } from '../../api/types';
import { User } from '../../api/interfaces';

export const useGetUsers = () => {
  const data: UseQueryResult<User[]> = useQuery({
    queryKey: ['users'],
    queryFn: () => ApiService.makeRequest<User[]>('/api/users', HTTPMethod.GET, {}),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return {
    users: data.data,
    ...data,
  };
};

export const useGetContacts = (page: number) => {
  const data: UseQueryResult<User[]> = useQuery({
    queryKey: ['contacts'],
    queryFn: () => ApiService.makeRequest<User[]>('/users/contacts', HTTPMethod.GET, { page }),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return {
    contacts: data.data,
    ...data,
  };
};
export const useGetMostActives = (id: string) => {
  const data: UseQueryResult<User[]> = useQuery({
    queryKey: ['mostActives'],
    queryFn: () =>
      ApiService.makeRequest<User[]>(`/users/${id}/mostActive`, HTTPMethod.GET, undefined),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return {
    mostActives: data.data,
    ...data,
  };
};
