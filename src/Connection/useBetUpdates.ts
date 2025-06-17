import { useEffect } from 'react';
import socket from './socket';
import { useQueryClient } from '@tanstack/react-query';

export function useBetUpdates() {
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.on('betUpdated', (updatedBet) => {
      alert('!!@!!!!');
      queryClient.setQueryData(['user-profile'], (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          bets: oldData.bets.map((bet: any) => (bet.id === updatedBet.id ? updatedBet : bet)),
        };
      });
    });

    return () => {
      socket.off('betUpdated');
    };
  }, [queryClient]);
}
