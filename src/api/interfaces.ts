export interface User {
  username: string;
  fullName?: string;
  image?: string;
  password?: string;
  email?: string;
  phoneNumber?: string;
  userBets?: number[];
  userGroups?: number[];
}

export interface Group {
  groupId: string;
  groupName: string;
  createdAt?: string;
  users: User[];
  image?: string;
}

export interface Bet {
  name: string;
  createdAt: string;
  groupName?: string;
  participants?: User[];
  group?: Group;
  risk: TagType;
}

export enum TagType {
  LOW = "LOW",
  MID = "MID",
  HIGH = "HIGH",
  PARTICIPANTS = "PARTICIPANTS",
  POINTS = "POINTS",
}

export const TagText: Record<TagType, string> = {
  [TagType.LOW]: "סיכון נמוך",
  [TagType.MID]: "סיכון בינוני",
  [TagType.HIGH]: "סיכון גבוה",
  [TagType.PARTICIPANTS]: "משתתפים",
  [TagType.POINTS]: "נקודות",
};