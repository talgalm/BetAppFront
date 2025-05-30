import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useBet } from './Hooks/useBet';
import { HeaderContainer, MainContainer, ContentContainer } from './BetPage.styles';
import { TypographyTypes } from '../../components/Topography/TypographyTypes';
import { Typography } from '../../components/Topography/topography';
import Tag, { TagType } from '../../components/Tag/TagComponent';
import { ParticipantStatus, User, VoteDecision } from '../../Interfaces';
import { formatDateToGB } from '../../utils/Helpers';
import BetLoader from '../../Theme/Loader/loader';
import { useQueryClient } from '@tanstack/react-query';
import { ParticipantAction, useParticipantAction } from './Hooks/useParticipentAction';
import ButtonsHub, { ButtonsHubStatus } from '../ButtonsHub';
import { createActionButtons } from './buttons';
import { getParticipentStatus, getTagType } from '../../utils/betUtils';
import { useFieldDefinitions } from './useFieldDefinitions';
import { useState } from 'react';
import FieldRow from './BetPageRow/FieldRow';
import { useAtom } from 'jotai';
import { betWinnerAtom, finishBetAtom } from '../../Jotai/atoms';
import { usePickWinnerAction } from './Hooks/usePickWinner';

const BetPage = (): JSX.Element => {
  const { t } = useTranslation();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(['user-profile']);
  const { data: bet, isLoading } = useBet(id);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { mutateAsync: PickAction } = useParticipantAction();
  const { mutateAsync: PickWinner } = usePickWinnerAction();
  const fieldDefinitions = useFieldDefinitions(bet);
  const [finishBet, SetFinishBet] = useAtom(finishBetAtom);
  const [date, hour] = formatDateToGB(bet?.createdAt).split(', ');
  const [pickedWinners] = useAtom(betWinnerAtom);

  const tagType = getTagType(bet);

  const send = async (action: ParticipantAction) => {
    try {
      await PickAction({ betId: bet?.id ?? '', userId: user!.id, action });
    } catch (err) {
      /* empty */
    }
  };

  const sendWinner = async () => {
    try {
      if (pickedWinners.length > 0) {
        const result = await PickWinner({
          betId: bet?.id ?? '',
          userId: user!.id,
          winners: pickedWinners,
        });
        if (result.action === VoteDecision.UNDECIDED) {
          SetFinishBet(false);
        }
      }
    } catch (err) {
      /* empty */
    }
  };

  const handleAction = (action: ParticipantAction) => {
    const allowedTypes = [TagType.PENDING_APPROVAL, TagType.PENDING_APPROVAL_REST];

    if (allowedTypes.includes(tagType)) {
      send(action);
    } else if (!finishBet) {
      SetFinishBet(true);
    } else {
      sendWinner();
      // console.log('!');
    }
  };

  const participentStatus = getParticipentStatus(bet, user?.id);

  const buttons = createActionButtons(tagType, handleAction, finishBet ?? false, participentStatus);

  if (isLoading) {
    <BetLoader />;
  }

  return (
    <MainContainer>
      <HeaderContainer>
        <Typography
          value={finishBet ? t('BetPage.approveAndPickWinner') : bet?.name}
          variant={TypographyTypes.H1}
        />
        {bet?.createdAt && (
          <Typography value={t('BetPage.createdAt', { date, hour })} variant={TypographyTypes.H2} />
        )}
        <Tag type={tagType} />
      </HeaderContainer>
      <ContentContainer state={finishBet ?? false} isOneButton={tagType === TagType.COMPLETED}>
        {!finishBet &&
          fieldDefinitions.map((field, idx) => (
            <FieldRow
              key={idx}
              {...field}
              currentUser={user}
              isOpen={openIndex === idx}
              onToggle={() => setOpenIndex((prev) => (prev === idx ? null : idx))}
            />
          ))}
        {finishBet && (
          <div>
            {[fieldDefinitions[1]].map((field, idx) => (
              <FieldRow
                key={idx}
                {...field}
                currentUser={user}
                isOpen={true}
                onToggle={() => setOpenIndex((prev) => (prev === idx ? null : idx))}
              />
            ))}
            {[fieldDefinitions[0]].map((field, idx) => (
              <FieldRow
                key={idx}
                {...field}
                currentUser={user}
                isOpen={true}
                onToggle={() => setOpenIndex((prev) => (prev === idx ? null : idx))}
              />
            ))}
          </div>
        )}
      </ContentContainer>
      <ButtonsHub type={ButtonsHubStatus.FIXED} buttons={buttons} />
    </MainContainer>
  );
};

export default BetPage;
