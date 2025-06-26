import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiService, HTTPMethod } from '@api/apiService';
import { User } from '@interfaces/User.interface';

interface UpdateBetPayload {
  userId: string;
  data: Partial<User>;
}

interface UpdateBetResponse {
  user: User;
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<UpdateBetResponse, Error, UpdateBetPayload>({
    mutationFn: ({ userId, data }) =>
      ApiService.makeRequest<UpdateBetResponse>(`/users/${userId}`, HTTPMethod.PATCH, data),

    onSuccess: (response) => {
      queryClient.setQueryData(['user-profile'], response.user);
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
    },
  });
};
