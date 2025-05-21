// utils/buttons.ts
import { ButtonConfig } from '../../components/Button/StyledButton';
import { TagType } from '../../components/Tag/TagComponent';
import { t } from 'i18next';
import { ThemeType } from '../../Theme/theme';
import { ParticipantAction } from './Hooks/useParticipentAction';

export const createActionButtons = (
  tagType: TagType,
  handleAction: (a: ParticipantAction) => void
): ButtonConfig[] => [
  {
    value:
      tagType === TagType.PENDING_APPROVAL_REST
        ? t('BetPage.approveAndPickWinner')
        : tagType === TagType.PENDING_APPROVAL
          ? t('BetPage.approveParticipation')
          : t('BetPage.finish'),
    onClick: () => handleAction(ParticipantAction.APPROVE),
    disabled: tagType === TagType.PENDING_APPROVAL_REST,
  },
  ...(tagType === TagType.PENDING_APPROVAL_REST || tagType === TagType.PENDING_APPROVAL
    ? [
        {
          value:
            tagType === TagType.PENDING_APPROVAL_REST
              ? t('BetPage.leaveBet')
              : t('BetPage.rejectInvite'),
          onClick: () => handleAction(ParticipantAction.REJECT),
          colorVariant: ThemeType.Secondary,
          styleProps: { color: '#E33E21' },
        },
      ]
    : []),
];
