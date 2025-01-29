import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { Group } from '../api/interfaces';
import { ApiService, HTTPMethod } from '../api/types';

interface CreateGroupPayload {
  groupName: string;
  users: string[];
}

export const useGroupCreation = (): UseMutationResult<Group, Error, CreateGroupPayload> => {
  return useMutation({
    mutationFn: async ({ groupName, users }: CreateGroupPayload): Promise<Group> => {
      const response = await ApiService.makeRequest<Group>('/api/groups/create', HTTPMethod.POST, {
        groupName,
        users,
      });
      return response;
    },
  });
};
