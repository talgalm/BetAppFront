export interface User {
  id: string;
  fullName?: string;
  image?: File;
  password?: string;
  email?: string;
  phoneNumber?: string;
  points?: number;
  bets?: Bet[];
  groups?: Group[];
}

export interface Group {
  id: string;
  name: string;
  createdAt?: string;
  users: User[];
  image?: string;
}

export interface Bet {
  name: string;
  createdAt: string;
  groupName?: string;
  userGuesses: User[];
  group?: Group;
  riskLevel: TagType;
}

export enum TagType {
  LOW = 'Low',
  MID = 'Mid',
  HIGH = 'High',
  PARTICIPANTS = 'PARTICIPANTS',
  POINTS = 'POINTS',
}

export const TagText: Record<TagType, string> = {
  [TagType.LOW]: 'סיכון נמוך',
  [TagType.MID]: 'סיכון בינוני',
  [TagType.HIGH]: 'סיכון גבוה',
  [TagType.PARTICIPANTS]: 'משתתפים',
  [TagType.POINTS]: 'נקודות',
};
