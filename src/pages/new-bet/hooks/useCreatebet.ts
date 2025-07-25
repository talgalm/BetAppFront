import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { ApiService, HTTPMethod } from '@api/apiService';
import { Bet } from '@interfaces/Bet.interface';

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
  files?: File[];
  supervisor?: Participant[];
  Status?: string;
  creator: string;
  BetIdIfExists?: string;
};

export const useCreateBet = (): UseMutationResult<Bet, Error, CreateBetInputs> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (betData: CreateBetInputs): Promise<Bet> => {
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

      const response = await ApiService.makeRequest<Bet>('/bets', HTTPMethod.POST, payload);

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
    },
  });
};
