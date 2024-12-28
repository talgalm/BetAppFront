import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ApiService, HTTPMethod } from "../api/types";
import { User } from "../api/interfaces";

export const useGetUsers = () => {
  const data: UseQueryResult<User[]> = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      ApiService.makeRequest<User[]>("/api/users", HTTPMethod.GET, {}),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return {
    users: data.data,
    ...data,
  };
};
