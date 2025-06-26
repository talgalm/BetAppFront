import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiService, HTTPMethod } from '@api/apiService';
import { Bet } from '@interfaces/Bet.interface';

export const useSecondRoundVoting = () => {
  const queryClient = useQueryClient();

  return useMutation<{ bet: Bet }, Error, { betId: string }>({
    mutationFn: ({ betId }) =>
      ApiService.makeRequest<{ bet: Bet }>(`/bets/${betId}/second-round-voting`, HTTPMethod.GET),

    onSuccess: (response) => {
      queryClient.setQueryData<Bet>(['bet', response.bet.id], response.bet);
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
    },
  });
};
