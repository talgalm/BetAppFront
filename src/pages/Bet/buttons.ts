import { ButtonConfig } from '@components/Button/StyledButton';
import { TagType } from '@components/Tag/TagComponent';
import { t } from 'i18next';
import { ThemeType } from '@theme/theme';
import { DialogAction, DialogType } from '@components/StyledDialog/StyledDialog';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import { ParticipantStatus } from '@interfaces/Prediction.interface';
import { dialogActionAtom } from '@store/dialogAtoms';
import { ParticipantAction } from './hooks/useParticipentAction';
import { ERROR_COLOR, PRIMARY_GREEN } from '@theme/colorTheme';

export const createActionButtons = (
  tagType: TagType,
  handleAction: (a: ParticipantAction) => void,
  isFinish: boolean,
  participentStatus?: ParticipantStatus
): ButtonConfig[] => {
  const buttons: ButtonConfig[] = [];

  if (participentStatus === ParticipantStatus.CANCELED) {
    return buttons;
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
      onClick: () =>
        isLeave ? handleAction(ParticipantAction.LEAVE) : handleAction(ParticipantAction.REJECT),
      colorVariant: ThemeType.Secondary,
      styleProps: { color: ERROR_COLOR },
    });
  } else if (tagType === TagType.COMPLETED) {
    buttons.push({
      value: t('BetPage.DeleteBet'),
      colorVariant: ThemeType.Secondary,
      styleProps: { color: ERROR_COLOR },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onClick: () => {},
    });
  }

  return buttons;
};

export const createDialogButtons = (
  dialogType: DialogType,
  actions: { [key: string]: () => void }
): ButtonConfig[] => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [dialogAction, setDialogAction] = useAtom(dialogActionAtom);

  if (dialogAction) {
    return [
      {
        value: 'אשר',
        onClick: actions[dialogAction],
      },
      {
        value: 'חזור',
        onClick: () => setDialogAction(null),
        colorVariant: ThemeType.Secondary,
        styleProps: { border: `2px solid ${PRIMARY_GREEN}` },
      },
    ];
  }

  return [
    {
      value: t('StyledDialog.SecondRoundVoting'),
      onClick: () => setDialogAction(DialogAction.SecondRound),
      colorVariant: ThemeType.Secondary,
      styleProps: { border: `2px solid ${PRIMARY_GREEN}` },
    },
    {
      value: t('StyledDialog.MultiWinners'),
      onClick: () => setDialogAction(DialogAction.PickWinner),
      colorVariant: ThemeType.Secondary,
      styleProps: { border: `2px solid ${PRIMARY_GREEN}` },
    },
    dialogType === DialogType.BetCreator
      ? {
          value: t('StyledDialog.BetCreatorAddSupervisor'),
          onClick: () => setDialogAction(DialogAction.AddSupervisor),
          colorVariant: ThemeType.Primary,
        }
      : {
          value: t('StyledDialog.BetSupervisorPickWinner'),
          onClick: () => setDialogAction(DialogAction.Draw),
          colorVariant: ThemeType.Primary,
        },
  ];
};
