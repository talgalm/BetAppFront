import { betStatusToTagType, TagType } from '../components/Tag/TagComponent';
import { BetStatus } from '../Interfaces';

export const getTagType = (status?: BetStatus, showActionRow?: boolean): TagType => {
  if (status === BetStatus.PENDING_DECISION) return TagType.PENDING_DECISION;
  if (status === BetStatus.ACTIVE) return TagType.ACTIVE;
  if (!showActionRow && status === BetStatus.PENDING) return TagType.PENDING_APPROVAL_REST;
  if (showActionRow) return TagType.PENDING_APPROVAL;
  return betStatusToTagType[status ?? BetStatus.ACTIVE];
};
