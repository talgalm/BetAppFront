import { ButtonConfig } from '../../components/Button/StyledButton';
import { TagType } from '../../components/Tag/TagComponent';
import { t } from 'i18next';
import { ThemeType } from '../../Theme/theme';
import { ParticipantAction } from './Hooks/useParticipentAction';

export const createActionButtons = (
  tagType: TagType,
  handleAction: (a: ParticipantAction) => void,
  isFinish: boolean
): ButtonConfig[] => {
  const buttons: ButtonConfig[] = [];

  if (tagType === TagType.COMPLETED) {
    return [];
  }

  // First Button Logic
  if (tagType === TagType.PENDING_APPROVAL) {
    buttons.push({
      value: t('BetPage.approveParticipation'),
      onClick: () => handleAction(ParticipantAction.APPROVE),
      disabled: false,
    });
  } else if (tagType === TagType.PENDING_APPROVAL_REST || tagType === TagType.ACTIVE) {
    buttons.push({
      value: isFinish ? t('BetPage.finishAndApprove') : t('BetPage.approveAndPickWinner'),
      onClick: () => handleAction(ParticipantAction.APPROVE),
      disabled: tagType === TagType.PENDING_APPROVAL_REST,
    });
  } else {
    buttons.push({
      value: t('BetPage.approveAndPickWinner'),
      onClick: () => handleAction(ParticipantAction.APPROVE),
      disabled: false,
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

// if type PENDING_APPROVAL :
// buton first t('BetPage.approveAndPickWinner'
// buton second t('BetPage.rejectInvite')

// if type PENDING_APPROVAL_REST ||  type ACTIVE:
// buton first t('BetPage.approveParticipation')
// buton second t('BetPage.leaveBet') <- disable if PENDING_APPROVAL_REST
