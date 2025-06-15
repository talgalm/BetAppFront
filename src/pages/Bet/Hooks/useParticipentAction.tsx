// src/pages/Bet/Hooks/useParticipantAction.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiService, HTTPMethod } from '../../../API/api';
import { Bet, ParticipantStatus, Prediction, User } from '../../../Interfaces';

export enum ParticipantAction {
  APPROVE = 'approve',
  REJECT = 'reject',
  LEAVE = 'leave',
}

interface ActionPayload {
  betId: string;
  userId: string;
  action: ParticipantAction;
}

export const useParticipantAction = () => {
  const queryClient = useQueryClient();

  return useMutation<
    { result: string },
    Error,
    ActionPayload,
    {
      previousProfile?: User;
      previousBet?: unknown;
    }
  >({
    mutationFn: ({ betId, userId, action }) =>
      ApiService.makeRequest<{ result: string }>(
        `/bets/${betId}/participants/${userId}/response`,
        HTTPMethod.POST,
        { action }
      ),

    onMutate: async ({
      betId,
      userId,
      action,
    }): Promise<{
      previousProfile?: User;
      previousBet?: unknown;
    }> => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: ['user-profile'] }),
        queryClient.cancelQueries({ queryKey: ['bet', betId] }),
      ]);

      const previousProfile = queryClient.getQueryData<User>(['user-profile']);
      const previousBet = queryClient.getQueryData(['bet', betId]);

      queryClient.setQueryData<User>(['user-profile'], (old) => {
        if (!old) return old;
        return {
          ...old,
          bets: old.bets.map((bet) => {
            if (bet.id !== betId) return bet;
            return {
              ...bet,
              predictions: (bet.predictions ?? []).map((pred) =>
                pred.userId === userId
                  ? {
                      ...pred,
                      status:
                        action === ParticipantAction.APPROVE
                          ? ParticipantStatus.APPROVED
                          : ParticipantStatus.PENDING,
                    }
                  : pred
              ),
            };
          }),
        };
      });

      queryClient.setQueryData(['bet', betId], (old: Bet) => {
        if (!old) return old;
        return {
          ...old,
          predictions: (old.predictions ?? []).map((pred: Prediction) =>
            pred.userId === userId
              ? {
                  ...pred,
                  status:
                    action === ParticipantAction.APPROVE
                      ? ParticipantStatus.APPROVED
                      : ParticipantStatus.PENDING,
                }
              : pred
          ),
        };
      });

      return { previousProfile, previousBet };
    },

    onError: (_err, { betId }, context) => {
      if (context?.previousProfile) {
        queryClient.setQueryData(['user-profile'], context.previousProfile);
      }
      if (context?.previousBet) {
        queryClient.setQueryData(['bet', betId], context.previousBet);
      }
    },

    onSettled: (_data, _error, { betId }) => {
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
      queryClient.invalidateQueries({ queryKey: ['bet', betId] });
    },
  });
};
