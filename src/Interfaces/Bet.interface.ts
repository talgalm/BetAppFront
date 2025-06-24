import { ParticipantStatus, Prediction } from './Prediction.interface';
import { User } from './User.interface';

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

export interface BetFile {
  id: string;
  fileName: string;
  fileType: string;
  url: string;
  uploadedAt: Date;
}

export enum VoteDecision {
  DRAW = 'draw',
  ENDED = 'ended',
  UNDECIDED = 'undecided',
}
