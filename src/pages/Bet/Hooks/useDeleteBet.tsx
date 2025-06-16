import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiService, HTTPMethod } from '../../../API/api';

export const useDeleteBet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!id) throw new Error('Bet ID is required');
      return ApiService.makeRequest(`/bets/${id}`, HTTPMethod.DELETE, undefined, true, true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
    },
    onError: (error: any) => {
      console.error('Failed to delete bet:', error.message);
    },
  });
};
