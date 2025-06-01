import { ButtonConfig } from '../../components/Button/StyledButton';
import { TagType } from '../../components/Tag/TagComponent';
import { t } from 'i18next';
import { ThemeType } from '../../Theme/theme';
import { ParticipantAction } from './Hooks/useParticipentAction';
import { ParticipantStatus, User } from '../../Interfaces';
import { DialogType } from '../../components/StyledDialog/StyledDialog';
import { useTranslation } from 'react-i18next';

export const createActionButtons = (
  tagType: TagType,
  handleAction: (a: ParticipantAction) => void,
  isFinish: boolean,
  participentStatus?: ParticipantStatus
): ButtonConfig[] => {
  const buttons: ButtonConfig[] = [];

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
  } else if (tagType === TagType.COMPLETED) {
    buttons.push({
      value: t('BetPage.CreateSimilerBet'),
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onClick: () => {},
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
  } else if (tagType === TagType.COMPLETED) {
    buttons.push({
      value: t('BetPage.DeleteBet'),
      colorVariant: ThemeType.Secondary,
      styleProps: { color: '#E33E21' },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onClick: () => {},
    });
  }

  return buttons;
};

export const createDialogButtons = (dialogType: DialogType): ButtonConfig[] => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation();
  const buttons: ButtonConfig[] = [];

  buttons.push({
    value: t(`StyledDialog.SecondRoundVoting`),
    // onClick: onConfirm,
    colorVariant: ThemeType.Primary,
  });
  buttons.push({
    value: t(`StyledDialog.MultiWinners`),
    // onClick: onConfirm,
    colorVariant: ThemeType.Primary,
  });

  if (dialogType === DialogType.BetCreator) {
    buttons.push({
      value: t(`StyledDialog.${dialogType}AddSupervisor`),
      // onClick: onConfirm,
      colorVariant: ThemeType.Primary,
    });
  } else if (dialogType === DialogType.BetSupervisor) {
    buttons.push({
      value: t(`StyledDialog.${dialogType}PickWinner`),
      // onClick: onConfirm,
      colorVariant: ThemeType.Primary,
    });
  }

  return buttons;
};
