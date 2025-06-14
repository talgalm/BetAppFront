import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { ApiService, HTTPMethod } from '../../../API/api';
import { Bet } from '../../../Interfaces';

export type Participant = {
  id?: string;
  fullName?: string;
  phoneNumber: string;
  guess?: string;
  date?: Date | string;
  status?: string;
};

export type CreateBetInputs = {
  Start?: string;
  name: string;
  description?: string;
  betim: number;
  deadline?: Date | string;
  participants?: Participant[];
  Conditions?: any;
  files?: File[]; // Ignored in the request
  supervisor?: Participant[];
  Status?: boolean;
  creator: string;
};

export const useCreateBet = (): UseMutationResult<{ bet: Bet }, Error, CreateBetInputs> => {
  return useMutation({
    mutationFn: async (betData: CreateBetInputs): Promise<{ bet: Bet }> => {
      const payload = {
        ...betData,
        deadline: betData.deadline ? new Date(betData.deadline).toISOString() : null,
        participants: betData.participants?.map((p) => ({
          ...p,
          date: p.date ? new Date(p.date).toISOString() : null,
        })),
        files: [],
        supervisor: betData.supervisor ?? [],
      };

      const response = await ApiService.makeRequest<{ bet: Bet }>(
        '/bets',
        HTTPMethod.POST,
        payload
      );

      return response;
    },
  });
};
