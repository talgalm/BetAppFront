import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiService, HTTPMethod } from '../../../API/api';
import { Bet, ParticipantStatus, User, VoteDecision } from '../../../Interfaces';

interface ActionPayload {
  betId: string;
  winners: string[];
}

interface ResultPaylod {
  bet: Bet;
}

export const useDeclareWinner = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ResultPaylod,
    Error,
    ActionPayload,
    {
      previousProfile?: User;
      previousBet?: unknown;
    }
  >({
    mutationFn: ({ betId, winners }) =>
      ApiService.makeRequest<ResultPaylod>(`/bets/${betId}/declare-winner`, HTTPMethod.POST, {
        winners,
      }),
    onSuccess: (data) => {
      queryClient.setQueryData<Bet>(['bet', data.bet.id], data.bet);
    },
  });
};
