import { useTranslation } from 'react-i18next';
import { ParticipantStatus, Prediction, User } from '../../../Interfaces';
import { ActionRow } from '../SingleBetRow.styles';
import { Typography } from '../../../components/Topography/topography';
import { TypographyTypes } from '../../../components/Topography/TypographyTypes';
import { ParticipantAction, useParticipantAction } from '../../Bet/Hooks/useParticipentAction';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  betId: string;
  predictions: Prediction[];
}

export default function ParticipantActionRow({ betId, predictions }: Props) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(['user-profile']);

  const { mutateAsync } = useParticipantAction();

  // const myStatus = predictions.find((p) => p.userId === user?.id)?.status;
  // if (myStatus !== ParticipantStatus.PENDING) return null;

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

  return (
    <ActionRow>
      <Typography
        value={t('Home.Confirm')}
        variant={TypographyTypes.Button}
        styleProps={{ color: '#15AB94' }}
        onClick={handleClick(ParticipantAction.APPROVE)}
      />
      <Typography
        value={t('Home.Cancel')}
        variant={TypographyTypes.Button}
        styleProps={{ color: '#E33E21' }}
        onClick={handleClick(ParticipantAction.REJECT)}
      />
    </ActionRow>
  );
}
