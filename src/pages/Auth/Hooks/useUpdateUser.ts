import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { ApiService, HTTPMethod } from '../../../API/api';
import { User } from '../../../Interfaces/User.interface';
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
