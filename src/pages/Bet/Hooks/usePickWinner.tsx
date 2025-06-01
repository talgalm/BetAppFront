import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiService, HTTPMethod } from '../../../API/api';
import { Bet, User, VoteDecision } from '../../../Interfaces';

interface ActionPayload {
  betId: string;
  userId: string;
  winners: string[];
}

interface ResultPaylod {
  bet: Bet;
  action: VoteDecision;
}

export const usePickWinnerAction = () => {
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
    mutationFn: ({ betId, userId, winners }) =>
      ApiService.makeRequest<ResultPaylod>(
        `/votes/${betId}/participants/${userId}/vote`,
        HTTPMethod.POST,
        { winners }
      ),
    onSuccess: (data) => {
      queryClient.setQueryData<Bet>(['bet', data.bet.id], data.bet);

      queryClient.setQueryData<User>(['user-profile'], (oldUser) => {
        if (!oldUser) return oldUser;

        return {
          ...oldUser,
          bets: oldUser.bets.map((b) =>
            b.id === data.bet.id ? { ...b, status: data.bet.status } : b
          ),
        };
      });
    },
  });
};
