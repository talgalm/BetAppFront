import { Group } from '../api/interfaces';
import { user1, user2, user3, user4, user5 } from './usersMock';

export const dror: Group = {
  id: '',
  name: 'Dror',
  users: [user1, user3, user3, user4, user5],
  createdAt: '01/08/2015',
};

export const galmors: Group = {
  id: '',
  name: 'The Galmors',
  users: [user1, user2],
  createdAt: '01/01/2024',
};

export const talsGroups = [dror, galmors];
