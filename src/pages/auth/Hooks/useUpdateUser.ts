import { useMutation, useQueryClient, UseMutationResult } from '@tanstack/react-query';
import { ApiService, HTTPMethod } from '@api/apiService';
import { User } from '@interfaces/User.interface';

interface PartialUserPayload {
  id: string;
  FullName?: string;
  Password?: string;
  Email?: string;
  PhoneNumber?: string;
}

export const useUpdateUser = (): UseMutationResult<{ user: User }, Error, PartialUserPayload> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...fieldsToUpdate }): Promise<{ user: User }> => {
      return ApiService.makeRequest<{ user: User }>(
        `/users/${id}`,
        HTTPMethod.PATCH,
        fieldsToUpdate
      );
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['user-profile', variables.id],
      });
    },
  });
};
