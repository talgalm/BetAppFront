import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { ApiService, HTTPMethod } from '../../../API/api';
import { User, Bet } from '../../../Interfaces';

export type FileInput = {
  userId: string;
  profileImage: File;
};

export const useUpdateProfileImage = (): UseMutationResult<User, Error, FileInput> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, profileImage }: FileInput): Promise<User> => {
      const formData = new FormData();
      formData.append('image', profileImage);

      return ApiService.makeRequest<User>(
        `/users/${userId}/image`,
        HTTPMethod.POST,
        formData,
        true
      );
    },
    onSuccess: (user) => {
      queryClient.setQueryData<User | null>(['user-profile'], (prev) => {
        if (!prev) return user;

        return {
          ...prev,
          image: user.image,
          bets:
            prev.bets?.map((bet) => ({
              ...bet,
              predictions:
                bet.predictions?.map((prediction) => {
                  if (prediction.userId === user.id) {
                    return {
                      ...prediction,
                      image: user.image,
                    };
                  }
                  return prediction;
                }) ?? [],
            })) ?? [],
        };
      });
    },
  });
};
