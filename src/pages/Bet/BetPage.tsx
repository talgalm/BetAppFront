import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useBet } from './Hooks/useBet';
import { HeaderContainer, MainContainer, ContentContainer } from './BetPage.styles';
import { TypographyTypes } from '../../components/Topography/TypographyTypes';
import { Typography } from '../../components/Topography/topography';
import Tag, { TagType } from '../../components/Tag/TagComponent';
import { BetStatus, User } from '../../Interfaces';
import { formatDateToGB } from '../../utils/Helpers';
import BetLoader from '../../Theme/Loader/loader';
import { useQueryClient } from '@tanstack/react-query';
import { ParticipantAction, useParticipantAction } from './Hooks/useParticipentAction';
import ButtonsHub, { ButtonsHubStatus } from '../ButtonsHub';
import { createActionButtons, createDialogButtons } from './buttons';
import {
  extractContacts,
  getParticipantAwareTagType,
  getParticipentStatus,
} from '../../utils/betUtils';
import { useFieldDefinitions } from './useFieldDefinitions';
import { useCallback, useEffect, useMemo, useState } from 'react';
import FieldRow from './BetPageRow/FieldRow';
import { useAtom } from 'jotai';
import { betWinnerAtom, contactModalDialogAtom, finishBetAtom } from '../../Jotai/atoms';
import { usePickWinnerAction } from './Hooks/usePickWinner';
import WinnerSection from './BetPageRow/WinnerSection/WinnerSection';
import { DialogType, StyledDialog } from '../../components/StyledDialog/StyledDialog';
import { useBetLogic } from './Hooks/useBetLogic';
import ContactModal from '../ContactModal/ContactModal';
import { NotificationHeader } from '../Home/SingleBetRow.styles';
import { useSocketUpdates } from '../../Connection/useSocketUpdates';

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
  const [contactDialog, setContactDialog] = useAtom(contactModalDialogAtom);
  const [date, hour] = useMemo(() => {
    return bet?.createdAt ? formatDateToGB(bet.createdAt).split(', ') : ['', ''];
  }, [bet?.createdAt]);
  const [pickedWinners, setPickedWinners] = useAtom(betWinnerAtom);

  const tagType = getParticipantAwareTagType(bet, user?.id);
  const participentStatus = getParticipentStatus(bet, user?.id);
  const [open, setOpen] = useState(false);

  const {
    handleCloseModal,
    SecondRoundDialogAction,
    PickWinnerDialogAction,
    AddSupervisorDialogAction,
    pickSingleWinner,
    DrawDialogAction,
    AddSupervisor,
  } = useBetLogic({
    setOpen,
  });

  const isDraw =
    (bet?.status === BetStatus.PENDING_SUPERVISOR && bet.supervisor?.id === user?.id) ||
    (bet?.status === BetStatus.PENDING_CREATOR && bet.creator?.id === user?.id && !bet.supervisor);

  useEffect(() => {
    if (isDraw) {
      setOpen(true);
    }
  }, [bet, isDraw, user?.id]);

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
        SetFinishBet(null);
      }
    } catch {
      /* empty */
    }
  }, [pickedWinners, PickWinner, bet?.id, user, setPickedWinners, SetFinishBet]);

  const handleAction = useCallback(
    (action: ParticipantAction) => {
      const allowedTypes = [TagType.PENDING_APPROVAL, TagType.PENDING_APPROVAL_REST];
      if (allowedTypes.includes(tagType) || action === ParticipantAction.LEAVE) {
        handleParticipantAction(action);
      } else if (!finishBet) {
        if (bet?.supervisor?.id === user?.id) {
          setOpen(true);
        } else {
          SetFinishBet({
            isFinished: true,
            mode: 'multi',
          });
        }
      } else {
        if (finishBet.mode === 'multi') submitWinners();
        else pickSingleWinner(pickedWinners[0]);
      }
    },
    [
      tagType,
      finishBet,
      handleParticipantAction,
      bet?.supervisor?.id,
      user?.id,
      SetFinishBet,
      submitWinners,
      pickSingleWinner,
      pickedWinners,
    ]
  );

  const handleOpenRow = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  const buttons = createActionButtons(
    tagType,
    handleAction,
    finishBet?.isFinished ?? false,
    participentStatus
  );

  const dialogType = bet?.supervisor ? DialogType.BetSupervisor : DialogType.BetCreator;

  const dialogButtons = createDialogButtons(dialogType, {
    SecondRoundDialogAction,
    PickWinnerDialogAction,
    AddSupervisorDialogAction,
    DrawDialogAction,
  });

  const handleSupervisorAdd = (users: User[]) => {
    if (users[0]) AddSupervisor(users[0]);
  };

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
        <NotificationHeader>
          {bet?.supervisor?.id === user?.id && <Tag type={TagType.SUPERVISOR} />}
          <Tag type={tagType} />
        </NotificationHeader>
      </HeaderContainer>
      <ContentContainer state={finishBet?.isFinished} full={buttons.length === 0}>
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
      <ContactModal
        open={!!contactDialog}
        handleClose={() => setContactDialog(null)}
        handleSave={handleSupervisorAdd}
        limit={1}
        limitContacts={extractContacts(bet)}
      />
    </MainContainer>
  );
};

export default BetPage;
