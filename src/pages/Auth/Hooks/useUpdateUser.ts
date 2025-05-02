import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { User } from '../../../Interfaces';
import { ApiService, HTTPMethod } from '../../../API/api';
interface PartialUserPayload {
  id: string;
  FullName?: string;
  Password?: string;
  Email?: string;
  PhoneNumber?: string;
  Image?: File;
}
export const useUpdateUser = (): UseMutationResult<{ user: User }, Error, PartialUserPayload> => {
  const mutation = useMutation({
    mutationFn: async (data: PartialUserPayload): Promise<{ user: User }> => {
      const { id, ...fieldsToUpdate } = data;
      const response = await ApiService.makeRequest<{ user: User }>(
        `/users/${id}`,
        HTTPMethod.PATCH,
        fieldsToUpdate
      );

      return response;
    },
  });

  return mutation;
};
