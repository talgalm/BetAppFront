import { useEffect } from 'react';
import socket from './socket';
import { useQueryClient } from '@tanstack/react-query';
import { Bet } from '@interfaces/Bet.interface';

export function useSocketUpdates(onBetUpdated?: (id: string) => void) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handler = (updatedBet: Bet) => {
      queryClient.setQueryData(['user-profile'], (oldData: any) => {
        if (!oldData) return oldData;

        const betExists = oldData.bets.some((bet: any) => bet.id === updatedBet.id);

        return {
          ...oldData,
          bets: betExists
            ? oldData.bets.map((bet: any) => (bet.id === updatedBet.id ? updatedBet : bet))
            : [...oldData.bets, updatedBet],
        };
      });

      queryClient.setQueryData(['bet', updatedBet.id], updatedBet);

      // ✅ Trigger callback for animation
      if (onBetUpdated) onBetUpdated(updatedBet.id);
    };

    socket.on('betUpdated', handler);
    return () => {
      socket.off('betUpdated', handler); // ✅ safe: returns void
    };
  }, [queryClient, onBetUpdated]);
}
