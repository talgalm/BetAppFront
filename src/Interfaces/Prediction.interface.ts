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
