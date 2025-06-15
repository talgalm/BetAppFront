import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiService, HTTPMethod } from '../../../API/api';
import { Bet, User } from '../../../Interfaces';

interface ActionPayload {
  betId: string;
  phoneNumber?: string;
  userId?: string;
}

interface ResultPaylod {
  bet: Bet;
}

export const useAddSupervisor = () => {
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
    mutationFn: ({ betId, phoneNumber, userId }) =>
      ApiService.makeRequest<ResultPaylod>(`/bets/${betId}/add-supervisor`, HTTPMethod.POST, {
        phoneNumber,
        userId,
      }),
    onSuccess: (data) => {
      queryClient.setQueryData<Bet>(['bet', data.bet.id], data.bet);
    },
  });
};
