import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useBet } from './Hooks/useBet';
import { useEffect } from 'react';
import {
  HeaderContainer,
  MainContainer,
  ContentContainer,
  Row,
  Column,
  AvatarRow,
  SmallAvatar,
  ButtonsContainer,
  ButtonsContainerInner,
} from './BetPage.styles';
import { TypographyTypes } from '../../components/Topography/TypographyTypes';
import { Typography } from '../../components/Topography/topography';
import Tag, { betStatusToTagType, TagType } from '../../components/Tag/TagComponent';
import { BetStatus, Prediction, User } from '../../Interfaces';
import { ReactComponent as ArrowIcon } from '../../Theme/Icons/Bet/Arrow.svg';
import { StyledDivider, SummaryRow } from '../NewBet/NewBetComponents/Summary/Summary.styles';
import { formatDate } from '../../utils/Helpers';
import { ReactComponent as FileIcon } from '../../Theme/Icons/FilesIcon.svg';
import { ReactComponent as BetimIcon } from '../../Theme/Icons/Betim.svg';
import { isArray } from 'lodash';
import BetLoader from '../../Theme/Loader/loader';
import StyledButton from '../../components/Button/StyledButton';
import { useQueryClient } from '@tanstack/react-query';
import { ParticipantAction } from './Hooks/useParticipentAction';

interface FieldRowProps {
  label: string;
  value?: string | number | null;
  background?: string;
  icon?: any;
  arrValue?: Prediction[] | User;
}

const BetPage = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(['user-profile']);
  const { data: bet, isLoading, error } = useBet(id);

  const fieldDefinitions: FieldRowProps[] = [
    { label: t('BetPage.participents'), value: '', arrValue: bet?.predictions },
    { label: t('BetPage.description'), value: bet?.description },
    {
      label: t('BetPage.predictions'),
      value: t('BetPage.personalPredictions'),
      background: '#CED0EF',
      icon: FileIcon,
    },
    { label: t('BetPage.betim'), value: bet?.betim, background: '#CEEFEA', icon: BetimIcon },
    {
      label: t('BetPage.deadline'),
      value: formatDate(bet?.deadline) !== '' ? formatDate(bet?.deadline) : null,
      background: '#CED0EF',
    },
    { label: t('BetPage.files'), value: bet?.description, background: '#CED0EF', icon: FileIcon },
    { label: t('BetPage.supervisor'), value: '', arrValue: bet?.supervisor },
  ];

  const FieldRow = ({ label, value = '—', background, icon: Icon, arrValue }: FieldRowProps) => (
    <>
      {(value || arrValue) && (
        <Row>
          <Column>
            <Typography
              value={label}
              variant={TypographyTypes.H3}
              styleProps={{ color: 'black' }}
            />
            {background ? (
              <SummaryRow background={background}>
                {value && (
                  <Typography
                    value={value}
                    variant={TypographyTypes.TextMedium}
                    styleProps={{ color: 'black' }}
                  />
                )}
                {Icon && <Icon width={18} height={18} />}
              </SummaryRow>
            ) : (
              <>
                {value && (
                  <Typography
                    value={value}
                    variant={TypographyTypes.TextMedium}
                    styleProps={{ color: 'black' }}
                  />
                )}
                {!isArray(arrValue) && arrValue && (
                  <div style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
                    <SmallAvatar>{arrValue.fullName?.charAt(0)}</SmallAvatar>
                    <Typography
                      value={arrValue.fullName}
                      variant={TypographyTypes.TextMedium}
                      styleProps={{ color: 'black' }}
                    />
                  </div>
                )}
              </>
            )}
            {arrValue && (
              <AvatarRow>
                {isArray(arrValue) &&
                  [...arrValue]
                    .sort((a, b) =>
                      user && a.userId === user.id ? -1 : user && b.userId === user.id ? 1 : 0
                    )
                    .map((participant) => (
                      <SmallAvatar
                        key={participant.userId}
                        status={participant.approved ?? 'pending'}
                      >
                        {participant.fullName?.charAt(0)}
                      </SmallAvatar>
                    ))}
              </AvatarRow>
            )}
          </Column>
          <ArrowIcon />
        </Row>
      )}
      {(value || arrValue) && <StyledDivider />}
    </>
  );

  useEffect(() => {
    if (bet) {
      console.log('Fetched Bet:', bet);
    }
  }, [bet]);

  const formattedDate = bet?.createdAt
    ? new Date(bet.createdAt).toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
    : '';

  const [date, hour] = formattedDate.split(', ');

  if (isLoading) {
    <BetLoader />;
  }

  const showActionRow =
    bet?.predictions?.find((p) => p.userId === user?.id)?.approved === BetStatus.PENDING;

  const betStatus: TagType | undefined =
    bet?.status === BetStatus.ACTIVE
      ? TagType.ACTIVE
      : !showActionRow && bet?.status === BetStatus.PENDING
        ? TagType.PENDING_APPROVAL_REST
        : showActionRow
          ? TagType.PENDING_APPROVAL
          : undefined;

  const tagType: TagType = betStatus ?? betStatusToTagType[bet?.status ?? BetStatus.ACTIVE];

  const handleAction = (action: ParticipantAction) => {
    if (tagType === TagType.PENDING_APPROVAL_REST) {
      console.log(`Clicked "${action}" – tagType:`, tagType);
    }
    if (tagType === TagType.PENDING_APPROVAL) {
      console.log(`Clicked "${action}" – tagType:`, tagType);
    }
  };

  return (
    <MainContainer>
      <HeaderContainer>
        <Typography value={bet?.name} variant={TypographyTypes.H1} />
        {bet?.createdAt && (
          <Typography value={t('BetPage.createdAt', { date, hour })} variant={TypographyTypes.H2} />
        )}
        <Tag type={tagType} />
      </HeaderContainer>
      <ContentContainer>
        {fieldDefinitions.map((field, idx) => (
          <FieldRow
            key={idx}
            label={field.label}
            value={field.value}
            background={field.background}
            icon={field.icon}
            arrValue={field.arrValue}
          />
        ))}
      </ContentContainer>
      <ButtonsContainer>
        <StyledButton
          value={tagType === TagType.PENDING_APPROVAL_REST ? 'סיום ובחירת מנצח' : 'אשר השתתפות'}
          onClick={() => handleAction(ParticipantAction.APPROVE)}
          styleProps={{ width: '100%' }}
          disabled={tagType === TagType.PENDING_APPROVAL_REST}
        />
        <Typography
          value={tagType === TagType.PENDING_APPROVAL_REST ? 'יציאה מהתערבות' : 'דחה הזמנה'}
          variant={TypographyTypes.Button}
          onClick={() => handleAction(ParticipantAction.REJECT)}
          styleProps={{ color: '#E33E21' }}
        />
      </ButtonsContainer>
    </MainContainer>
  );
};

export default BetPage;
