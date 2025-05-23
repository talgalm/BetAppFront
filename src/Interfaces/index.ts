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
  supervisor?: User & { status?: ParticipantStatus };
  predictions?: Prediction[];
  isSupervisor?: boolean;
  supervisorStatus?: ParticipantStatus;
  winner?: User;
  createdAt?: Date;
}

export enum ParticipantStatus {
  APPROVED = 'active',
  PENDING = 'pending',
  CANCELED = 'canceled',
}

export interface Prediction {
  id: string;
  date?: Date;
  fullName?: string;
  guess?: string;
  phoneNumber: string;
  status?: ParticipantStatus;
  userId?: string;
}
