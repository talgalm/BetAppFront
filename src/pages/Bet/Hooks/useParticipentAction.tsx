// src/pages/Bet/Hooks/useParticipantAction.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiService, HTTPMethod } from '../../../API/api';
import { BetStatus, User } from '../../../Interfaces';

export enum ParticipantAction {
  APPROVE = 'approve',
  REJECT = 'reject',
}

interface ActionPayload {
  betId: string;
  userId: string;
  action: ParticipantAction;
}

export const useParticipantAction = () => {
  const queryClient = useQueryClient();

  return useMutation<{ result: string }, Error, ActionPayload>({
    mutationFn: ({ betId, userId, action }) =>
      ApiService.makeRequest<{ result: string }>(
        `/bets/${betId}/participants/${userId}/response`,
        HTTPMethod.POST,
        { action }
      ),

    onMutate: async ({ betId, userId, action }) => {
      await queryClient.cancelQueries({ queryKey: ['user-profile'] });

      const previousProfile = queryClient.getQueryData<User>(['user-profile']);

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
                      approved:
                        action === ParticipantAction.APPROVE ? BetStatus.ACTIVE : BetStatus.PENDING,
                    }
                  : pred
              ),
            };
          }),
        };
      });

      // return context for potential rollback
      return { previousProfile };
    },
    /* ---------- 3.  ensure fresh data ---------- */
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
    },
  });
};
