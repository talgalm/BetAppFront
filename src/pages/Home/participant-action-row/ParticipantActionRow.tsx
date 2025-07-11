import { useTranslation } from 'react-i18next';
import { ActionRow } from '../SingleBetRow.styles';
import { Typography } from '@components/Topography/typography';
import { TypographyTypes } from '@components/Topography/TypographyTypes';
import { ParticipantAction, useParticipantAction } from '../../bet/hooks/useParticipentAction';
import { useQueryClient } from '@tanstack/react-query';
import { TagType } from '@components/Tag/TagComponent';
import { useDeleteBet } from '../../bet/hooks/useDeleteBet';
import { useAtom } from 'jotai';
import { ActiveStep } from '@store/newBetStepAtom';
import { CreateBetInputs, newBetSteps, NewBetStepValueTypes } from '../../new-bet/new-bet-steps';
import { useNavigate } from 'react-router-dom';
import { useBet } from '../../bet/hooks/useBet';
import { User } from '@interfaces/User.interface';
import { ERROR_COLOR, PRIMARY_GREEN } from '@theme/colorTheme';

interface Props {
  betId: string;
  type: TagType;
}

export default function ParticipantActionRow({ betId, type }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(['user-profile']);
  const [, setActiveStep] = useAtom(ActiveStep);
  const { data: bet } = useBet(betId);

  const { mutateAsync } = useParticipantAction();
  const deleteBet = useDeleteBet();

  const send = async (action: ParticipantAction) => {
    try {
      await mutateAsync({ betId, userId: user!.id, action });
    } catch (err) {
      /* empty */
    }
  };

  const handleClick = (action: ParticipantAction) => (e: React.MouseEvent) => {
    e.stopPropagation();
    send(action);
  };

  const handleDeleteDraftBet = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteBet.mutate(betId);
  };

  const handleContinueNewBet = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveStep(newBetSteps[NewBetStepValueTypes.name]);
    if (bet) {
      const cleanedBet = Object.fromEntries(
        Object.entries(bet).filter(([_, value]) => value != null)
      );
      cleanedBet.BetIdIfExists = betId;
      cleanedBet.participents = bet.predictions;
      localStorage.setItem('betForm', JSON.stringify(cleanedBet));
    }
    navigate('/new-bet');
  };

  const isPending = type === TagType.PENDING_APPROVAL;

  const ConfirmText = isPending ? t('Home.Confirm') : t('Home.DraftConfirm');
  const CancelText = isPending ? t('Home.Cancel') : t('Home.DraftCancel');

  return (
    <ActionRow>
      <Typography
        value={ConfirmText}
        variant={TypographyTypes.Button}
        styleProps={{ color: PRIMARY_GREEN }}
        onClick={isPending ? handleClick(ParticipantAction.APPROVE) : handleContinueNewBet}
      />
      <Typography
        value={CancelText}
        variant={TypographyTypes.Button}
        styleProps={{ color: ERROR_COLOR }}
        onClick={isPending ? handleClick(ParticipantAction.REJECT) : handleDeleteDraftBet}
      />
    </ActionRow>
  );
}
