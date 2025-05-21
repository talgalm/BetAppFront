import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useBet } from './Hooks/useBet';
import { HeaderContainer, MainContainer, ContentContainer } from './BetPage.styles';
import { TypographyTypes } from '../../components/Topography/TypographyTypes';
import { Typography } from '../../components/Topography/topography';
import Tag, { TagType } from '../../components/Tag/TagComponent';
import { ParticipantStatus, User } from '../../Interfaces';
import { formatDateToGB } from '../../utils/Helpers';
import BetLoader from '../../Theme/Loader/loader';
import { useQueryClient } from '@tanstack/react-query';
import { ParticipantAction } from './Hooks/useParticipentAction';
import ButtonsHub, { ButtonsHubStatus } from '../ButtonsHub';
import { createActionButtons } from './buttons';
import { getTagType } from '../../utils/betUtils';
import { useFieldDefinitions } from './useFieldDefinitions';
import { useState } from 'react';
import FieldRow from './BetPageRow/FieldRow';

const BetPage = (): JSX.Element => {
  const { t } = useTranslation();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(['user-profile']);
  const { data: bet, isLoading } = useBet(id);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const fieldDefinitions = useFieldDefinitions(bet);

  const [date, hour] = formatDateToGB(bet?.createdAt).split(', ');

  const showActionRow =
    bet?.predictions?.find((p) => p.userId === user?.id)?.status === ParticipantStatus.PENDING;

  const tagType = getTagType(bet?.status, showActionRow);

  const buttons = createActionButtons(tagType, (action: ParticipantAction) => console.log(action));

  if (isLoading) {
    <BetLoader />;
  }

  return (
    <MainContainer>
      <HeaderContainer>
        <Typography value={bet?.name} variant={TypographyTypes.H1} />
        {bet?.createdAt && (
          <Typography value={t('BetPage.createdAt', { date, hour })} variant={TypographyTypes.H2} />
        )}
        <Tag type={tagType} />
      </HeaderContainer>
      <ContentContainer isActive={tagType === TagType.ACTIVE}>
        {fieldDefinitions.map((field, idx) => (
          <FieldRow
            key={idx}
            {...field}
            currentUser={user}
            isOpen={openIndex === idx}
            onToggle={() => setOpenIndex((prev) => (prev === idx ? null : idx))}
          />
        ))}
      </ContentContainer>
      <ButtonsHub type={ButtonsHubStatus.FIXED} buttons={buttons} />
    </MainContainer>
  );
};

export default BetPage;
