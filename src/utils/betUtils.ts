import { betStatusToTagType, TagType } from '../components/Tag/TagComponent';
import { Bet, BetStatus, Contact, ParticipantStatus } from '../Interfaces';

export const getTagType = (bet: Bet | undefined): TagType => {
  if (!bet) {
    return betStatusToTagType[BetStatus.ACTIVE];
  }
  const predictions = bet.predictions || [];

  if (bet.status === BetStatus.COMPLETED) {
    return TagType.COMPLETED;
  }

  const allStatuses = predictions.map((p) => p.status).concat(bet.supervisorStatus);

  const hasPending = allStatuses.includes(ParticipantStatus.PENDING);
  const hasActive = allStatuses.includes(ParticipantStatus.APPROVED);
  const hasVoted = allStatuses.includes(ParticipantStatus.VOTED);

  const allActive = allStatuses.every((status) => status === ParticipantStatus.APPROVED);
  const allVoted = allStatuses.every((status) => status === ParticipantStatus.VOTED);

  if (hasPending && (hasActive || hasVoted)) {
    return TagType.PENDING_APPROVAL_REST;
  }

  if (allActive) {
    return TagType.ACTIVE;
  }

  if (hasActive && hasVoted) {
    return TagType.PENDING_DECISION;
  }

  if (allVoted) {
    return TagType.FINAL_DECISION_PENDING;
  }

  return betStatusToTagType[bet.status ?? BetStatus.ACTIVE];
};

export const getParticipentStatus = (
  bet: Bet | undefined,
  userId: string | undefined
): ParticipantStatus => {
  if (bet && userId) {
    const participant = bet.predictions?.find((p) => p.userId === userId);
    if (!participant) {
      return bet.supervisorStatus ?? ParticipantStatus.PENDING;
    } else {
      return participant?.status ?? ParticipantStatus.PENDING;
    }
  }
  return ParticipantStatus.CANCELED;
};

export const getParticipantAwareTagType = (
  bet: Bet | undefined,
  userId: string | undefined
): TagType => {
  const baseTagType = getTagType(bet);
  const participantStatus = getParticipentStatus(bet, userId);

  if (participantStatus === ParticipantStatus.PENDING) {
    return TagType.PENDING_APPROVAL;
  }

  return baseTagType;
};

export const extractContacts = (bet: Bet | null | undefined): Contact[] => {
  if (!bet || !bet.predictions) {
    return [];
  }

  return bet.predictions
    .filter((prediction) => prediction.userId && prediction.fullName)
    .map((prediction) => ({
      id: prediction.userId!,
      fullName: prediction.fullName!,
      phoneNumber: prediction.phoneNumber,
    }));
};
