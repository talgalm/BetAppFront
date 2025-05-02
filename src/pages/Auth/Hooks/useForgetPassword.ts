import { useMutation } from '@tanstack/react-query';
import { ApiService, HTTPMethod } from '../../../API/api';

export const useForgetPassword = () => {
  return useMutation<{ send: boolean }, Error, string>({
    mutationFn: (email: string) => {
      return ApiService.makeRequest<{ send: boolean }>(
        `/users/forget-password`,
        HTTPMethod.GET,
        { email },
        true
      );
    },
  });
};
