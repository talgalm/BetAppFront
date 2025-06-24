import { useQuery } from '@tanstack/react-query';
import { ApiService, HTTPMethod } from '../../../API/api';
import { Bet } from '../../../Interfaces/Bet.interface';

export const useBet = (id?: string, enabled = true) => {
  return useQuery<Bet, Error>({
    queryKey: ['bet', id],
    queryFn: async () => {
      if (!id) throw new Error('Bet ID is required');
      return ApiService.makeRequest<Bet>(`/bets/${id}`, HTTPMethod.GET, undefined, true, true);
    },
    enabled: enabled && !!id,
  });
};
