import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { ApiService, HTTPMethod } from '@api/apiService';
import { Bet } from '../../../interfaces/Bet.interface';

export type FileInput = {
  betId: string;
  files: File[];
};

export const useAttachFilesToBet = (): UseMutationResult<{ bet: Bet }, Error, FileInput> => {
  return useMutation({
    mutationFn: async ({ betId, files }: FileInput): Promise<{ bet: Bet }> => {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file);
      });

      return ApiService.makeRequest<{ bet: Bet }>(
        `/bets/${betId}/files`,
        HTTPMethod.POST,
        formData,
        true
      );
    },
  });
};
