import { useMutation } from '@tanstack/react-query';
import { ApiService, HTTPMethod } from '../../../API/api';
import { User } from '../../../Interfaces';

export const useVerifyCode = () => {
  return useMutation<{ userId: string }, Error, string>({
    mutationFn: (code: string) => {
      return ApiService.makeRequest<{ userId: string }>(
        `/users/verify-code`,
        HTTPMethod.GET,
        { code },
        true
      );
    },
  });
};
