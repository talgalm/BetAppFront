import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useBet } from './Hooks/useBet';
import { HeaderContainer, MainContainer, ContentContainer } from './BetPage.styles';
import { TypographyTypes } from '../../components/Topography/TypographyTypes';
import { Typography } from '../../components/Topography/topography';
import Tag, { TagType } from '../../components/Tag/TagComponent';
import { BetStatus, User, VoteDecision } from '../../Interfaces';
import { formatDateToGB } from '../../utils/Helpers';
import BetLoader from '../../Theme/Loader/loader';
import { useQueryClient } from '@tanstack/react-query';
import { ParticipantAction, useParticipantAction } from './Hooks/useParticipentAction';
import ButtonsHub, { ButtonsHubStatus } from '../ButtonsHub';
import { createActionButtons, createDialogButtons } from './buttons';
import { getParticipantAwareTagType, getParticipentStatus } from '../../utils/betUtils';
import { useFieldDefinitions } from './useFieldDefinitions';
import { useCallback, useEffect, useMemo, useState } from 'react';
import FieldRow from './BetPageRow/FieldRow';
import { useAtom } from 'jotai';
import { betWinnerAtom, finishBetAtom } from '../../Jotai/atoms';
import { usePickWinnerAction } from './Hooks/usePickWinner';
import WinnerSection from './BetPageRow/WinnerSection/WinnerSection';
import { DialogType, StyledDialog } from '../../components/StyledDialog/StyledDialog';
import { useBetLogic } from './Hooks/useBetLogic';
import { ButtonConfig } from '../../components/Button/StyledButton';
import { useUpdateBet } from './Hooks/useUpdateBet';

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
  const [date, hour] = useMemo(() => {
    return bet?.createdAt ? formatDateToGB(bet.createdAt).split(', ') : ['', ''];
  }, [bet?.createdAt]);
  const [pickedWinners, setPickedWinners] = useAtom(betWinnerAtom);

  const tagType = getParticipantAwareTagType(bet, user?.id);
  const participentStatus = getParticipentStatus(bet, user?.id);
  const [open, setOpen] = useState(false);

  const { handleCloseModal, secondRoundVoting, multiWinners, addSupervisor, pickWinner } =
    useBetLogic({
      setOpen,
    });

  useEffect(() => {
    if (bet?.status === BetStatus.PENDING_CREATOR) {
      setOpen(true);
    }
  }, [bet]);

  const handleParticipantAction = useCallback(
    async (action: ParticipantAction) => {
      try {
        await PickAction({ betId: bet?.id ?? '', userId: user!.id, action });
      } catch {
        /* empty */
      }
    },
    [PickAction, bet?.id, user]
  );

  const submitWinners = useCallback(async () => {
    try {
      if (pickedWinners.length > 0) {
        const result = await PickWinner({
          betId: bet?.id ?? '',
          userId: user!.id,
          winners: pickedWinners,
        });
        setPickedWinners([]);
        if ([VoteDecision.UNDECIDED, VoteDecision.ENDED].includes(result.action)) {
          SetFinishBet(false);
        }
      }
    } catch {
      /* empty */
    }
  }, [pickedWinners, PickWinner, bet?.id, user, setPickedWinners, SetFinishBet]);

  const handleAction = useCallback(
    (action: ParticipantAction) => {
      const allowedTypes = [TagType.PENDING_APPROVAL, TagType.PENDING_APPROVAL_REST];
      if (allowedTypes.includes(tagType)) {
        handleParticipantAction(action);
      } else if (!finishBet) {
        SetFinishBet(true);
      } else {
        submitWinners();
      }
    },
    [handleParticipantAction, submitWinners, finishBet, SetFinishBet, tagType]
  );

  const handleOpenRow = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  const buttons = createActionButtons(tagType, handleAction, finishBet ?? false, participentStatus);

  const dialogType = bet?.supervisor ? DialogType.BetSupervisor : DialogType.BetCreator;

  const dialogButtons = createDialogButtons(dialogType, {
    secondRoundVoting,
    multiWinners,
    addSupervisor,
    pickWinner,
  });

  if (isLoading) return <BetLoader />;

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
        {bet?.winners && <WinnerSection winners={bet.winners} />}
        {finishBet
          ? fieldDefinitions
              .slice(0, 2)
              .reverse()
              .map((field, idx) => (
                <FieldRow
                  key={idx}
                  {...field}
                  currentUser={user}
                  isOpen
                  onToggle={() => handleOpenRow(idx)}
                />
              ))
          : fieldDefinitions.map((field, idx) => (
              <FieldRow
                key={idx}
                {...field}
                currentUser={user}
                isOpen={openIndex === idx}
                onToggle={() => handleOpenRow(idx)}
              />
            ))}
      </ContentContainer>
      <ButtonsHub type={ButtonsHubStatus.FIXED} buttons={buttons} />
      <StyledDialog
        type={DialogType.BetCreator}
        open={open}
        closeModal={handleCloseModal}
        buttons={dialogButtons}
      />
    </MainContainer>
  );
};

export default BetPage;
