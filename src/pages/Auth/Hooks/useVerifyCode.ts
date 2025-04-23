import { useMutation } from '@tanstack/react-query';
import { ApiService, HTTPMethod } from '../../../api/types';
import { User } from '../../../api/interfaces';

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
