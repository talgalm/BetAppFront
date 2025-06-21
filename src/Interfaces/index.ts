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
}

export interface Contact {
  id: string;
  fullName?: string;
  phoneNumber?: string;
  status?: string;
}

export enum BetStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  PENDING = 'pending',
  CANCELED = 'canceled',
  COMPLETED = 'completed',
  PENDING_DECISION = 'pending_decision',
  PENDING_CREATOR = 'pending_creator',
  PENDING_SUPERVISOR = 'pending_supervisor',
  FINAL_DECISION_PENDING = 'final_pending_decision',
}

export interface Bet {
  id: string;
  name: string;
  description: string;
  status: BetStatus;
  betim: number;
  deadline?: Date;
  supervisor?: User & { status?: ParticipantStatus };
  creatorId?: string;
  creator?: User;
  predictions?: Prediction[];
  isSupervisor?: boolean;
  supervisorStatus?: ParticipantStatus;
  winners?: User[];
  createdAt?: Date;
  files?: BetFile[];
}

export enum ParticipantStatus {
  APPROVED = 'active',
  PENDING = 'pending',
  CANCELED = 'canceled',
  VOTED = 'voted',
}

export interface Prediction {
  id: string;
  date?: Date;
  fullName?: string;
  guess?: string;
  phoneNumber: string;
  status?: ParticipantStatus;
  userId?: string;
  candidate?: boolean;
  image?: string;
}

export enum VoteDecision {
  DRAW = 'draw',
  ENDED = 'ended',
  UNDECIDED = 'undecided',
}

export interface BetFile {
  id: string;
  fileName: string;
  fileType: string;
  url: string;
  uploadedAt: Date;
}
