export interface User {
  id: string;
  fullName?: string;
  image?: File;
  password?: string;
  email?: string;
  phoneNumber?: string;
  betim?: number;
  bets: Bet[];
  verifyEmail?: boolean;
}

export enum BetStatus {
  ACTIVE = 'active',
  PENDING = 'pending',
  CANCELED = 'canceled',
  COMPLETED = 'completed',
  PENDING_DECISION = 'pending_decision',
}

export interface Bet {
  id: string;
  name: string;
  description: string;
  status: BetStatus;
  betim: number;
  deadline?: Date;
  supervisor?: User;
  predictions?: Prediction[];
  isSupervisor?: boolean;
}

export interface Prediction {
  id: string;
  betId: string;
  userId: string;
  description?: string;
  deadline?: Date;
}
