import { betStatusToTagType, TagType } from '../components/Tag/TagComponent';
import { Bet, BetStatus, ParticipantStatus } from '../Interfaces';

export const getTagType = (bet: Bet | undefined): TagType => {
  if (!bet) {
    return betStatusToTagType[BetStatus.ACTIVE];
  }
  const predictions = bet.predictions || [];

  if (bet.status === BetStatus.COMPLETED) {
    return TagType.COMPLETED;
  }

  const allStatuses = predictions.map((p) => p.status);

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
    return participant?.status ?? ParticipantStatus.PENDING;
  }
  return ParticipantStatus.CANCELED;
};
