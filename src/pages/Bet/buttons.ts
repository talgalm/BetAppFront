import { ButtonConfig } from '../../components/Button/StyledButton';
import { TagType } from '../../components/Tag/TagComponent';
import { t } from 'i18next';
import { ThemeType } from '../../Theme/theme';
import { ParticipantAction } from './Hooks/useParticipentAction';
import { ParticipantStatus, User } from '../../Interfaces';
import { getParticipentStatus } from '../../utils/betUtils';

export const createActionButtons = (
  tagType: TagType,
  handleAction: (a: ParticipantAction) => void,
  isFinish: boolean,
  participentStatus?: ParticipantStatus
): ButtonConfig[] => {
  const buttons: ButtonConfig[] = [];

  if (tagType === TagType.COMPLETED) {
    return [];
  }

  const oneButtonDispaly = isFinish
    ? t('BetPage.finishAndApprove')
    : t('BetPage.approveAndPickWinner');

  const isOneButtonDispalyAfterVote = participentStatus === ParticipantStatus.VOTED;
  const oneButtonDispalyAfterVote =
    participentStatus === ParticipantStatus.APPROVED ? t('BetPage.approveAndPickWinner') : 'המתן';

  // First Button Logic
  if (tagType === TagType.PENDING_APPROVAL) {
    buttons.push({
      value: t('BetPage.approveParticipation'),
      onClick: () => handleAction(ParticipantAction.APPROVE),
      disabled: false,
    });
  } else if (tagType === TagType.PENDING_APPROVAL_REST || tagType === TagType.ACTIVE) {
    buttons.push({
      value: oneButtonDispaly,
      onClick: () => handleAction(ParticipantAction.APPROVE),
      disabled: tagType === TagType.PENDING_APPROVAL_REST,
    });
  } else if (tagType === TagType.PENDING_DECISION) {
    buttons.push({
      value: oneButtonDispalyAfterVote,
      onClick: () => handleAction(ParticipantAction.APPROVE),
      disabled: isOneButtonDispalyAfterVote,
    });
  }

  // Second Button Logic (REJECT/LEAVE)
  if (
    (tagType === TagType.PENDING_APPROVAL ||
      tagType === TagType.PENDING_APPROVAL_REST ||
      tagType === TagType.ACTIVE) &&
    !isFinish
  ) {
    const isLeave = tagType !== TagType.PENDING_APPROVAL;
    buttons.push({
      value: isLeave ? t('BetPage.leaveBet') : t('BetPage.rejectInvite'),
      onClick: () => handleAction(ParticipantAction.REJECT),
      colorVariant: ThemeType.Secondary,
      styleProps: { color: '#E33E21' },
    });
  }

  return buttons;
};
