import { Bet } from './Bet.interface';

export interface User {
  id: string;
  fullName?: string;
  image?: string;
  password?: string;
  email?: string;
  phoneNumber?: string;
  betim?: number;
  bets: Bet[];
  verifyEmail?: boolean;
  stats: ProfileStats;
}

export interface ProfileStats {
  wins: number;
  draw: number;
  loses: number;
}

export interface Contact {
  id: string;
  fullName?: string;
  phoneNumber?: string;
  status?: string;
}
