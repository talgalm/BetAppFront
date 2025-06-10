import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiService, HTTPMethod } from '../../../API/api';
import { Bet } from '../../../Interfaces';

export enum UpdateBetAdditionalAction {
  DeclareWinners = 'DeclareWinners',
  SingleWinner = 'SingleWinner',
  AddSupervisor = 'AddSupervisor',
  SecondRoundVoting = 'SecondRoundVoting',
}

interface UpdateBetPayload {
  betId: string;
  data: Partial<Bet> & { action?: UpdateBetAdditionalAction; payload?: string };
}

interface UpdateBetResponse {
  bet: Bet;
}

export const useUpdateBet = () => {
  const queryClient = useQueryClient();

  return useMutation<UpdateBetResponse, Error, UpdateBetPayload>({
    mutationFn: ({ betId, data }) =>
      ApiService.makeRequest<UpdateBetResponse>(`/bets/${betId}`, HTTPMethod.PATCH, data),

    onSuccess: (response) => {
      queryClient.setQueryData<Bet>(['bet', response.bet.id], response.bet);
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
    },
  });
};
