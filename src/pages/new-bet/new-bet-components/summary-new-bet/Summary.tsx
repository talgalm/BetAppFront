import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  CreateBetInputs,
  newBetSteps,
  NewBetStepValueTypes,
  Participant,
} from '../../new-bet-steps';
import { Typography } from '@components/Topography/typography';
import { ReactComponent as EditIcon } from '@assets/icons/EditDark.svg';
import { ReactComponent as LeftArrow } from '@assets/icons/arrowLeftBlack.svg';
import { ReactComponent as SinglePeopleIcon } from '@assets/icons/SinglePeople.svg';
import { ReactComponent as FileIcon } from '@assets/icons/FilesIcon.svg';

import { ReactComponent as BetimIcon } from '@assets/icons/Betim.svg';

import {
  ParticipantsRow,
  SmallAvatar,
  StyledDivider,
  SummaryColumn,
  SummaryContainer,
  SummaryRow,
} from './Summary.styles';
import { useTranslation } from 'react-i18next';
import { formatDate } from '@utils/Helpers';
import { useAtom } from 'jotai';
import { ActiveStep } from '@store/newBetStepAtom';
import { AvatarWrapper, StyledImage, StyledPDF } from '../files-new-bet/Files.styles';
import { TypographyTypes } from '@components/Topography/TypographyTypes';
import { LIGHT_GREEN, PRIMARY_BLACK, TAG_PURPLE } from '@theme/colorTheme';

const NewBetSummary: React.FC = () => {
  const { watch } = useFormContext<CreateBetInputs>();
  const [, setActiveStep] = useAtom(ActiveStep);

  const { t } = useTranslation();

  const handleStepSkip = (stepToSkip: NewBetStepValueTypes) => {
    newBetSteps[stepToSkip].skipToEnd = true;
    newBetSteps[stepToSkip].progress = 90;
    setActiveStep(newBetSteps[stepToSkip]);
  };

  return (
    <SummaryContainer>
      <SummaryRow onClick={() => handleStepSkip(NewBetStepValueTypes.name)} betCreation={true}>
        {watch().name && (
          <Typography
            value={watch().name}
            variant={TypographyTypes.H2}
            styleProps={{ color: PRIMARY_BLACK }}
          />
        )}
        <EditIcon />
      </SummaryRow>
      <StyledDivider />
      <SummaryRow
        onClick={() => handleStepSkip(NewBetStepValueTypes.participents)}
        betCreation={true}
      >
        {watch().participents && (
          <SummaryColumn>
            <Typography
              value={t('NewBet.SummaryParticipantsTitle')}
              variant={TypographyTypes.H3}
              styleProps={{ color: PRIMARY_BLACK }}
            />
            <ParticipantsRow>
              {watch().participents?.map((participant: Participant, index) => (
                <SmallAvatar src={participant.image} key={index}>
                  {participant.fullName?.charAt(0)}
                </SmallAvatar>
              ))}
            </ParticipantsRow>
          </SummaryColumn>
        )}
        <LeftArrow color="black" />
      </SummaryRow>
      <StyledDivider />
      {watch().description && (
        <>
          <SummaryRow
            onClick={() => handleStepSkip(NewBetStepValueTypes.description)}
            betCreation={true}
          >
            <SummaryColumn>
              <Typography
                value={t('NewBet.SummaryDescriptionTitle')}
                variant={TypographyTypes.H3}
                styleProps={{ color: PRIMARY_BLACK }}
              />
              <Typography
                value={watch().description || ''}
                variant={TypographyTypes.TextBig}
                styleProps={{
                  color: PRIMARY_BLACK,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  width: '300px',
                  direction: 'rtl',
                }}
              />
            </SummaryColumn>

            <LeftArrow color="black" />
          </SummaryRow>
          <StyledDivider />
        </>
      )}
      {watch().participents?.some(
        (particpent: Participant) => particpent.guess !== null || particpent.guess !== null
      ) && (
        <>
          <SummaryRow
            onClick={() => handleStepSkip(NewBetStepValueTypes.Conditions)}
            betCreation={true}
          >
            <SummaryColumn>
              <Typography
                value={t('NewBet.SummaryConditionsTitle')}
                variant={TypographyTypes.H3}
                styleProps={{ color: PRIMARY_BLACK }}
              />
              <SummaryRow background={TAG_PURPLE}>
                <SinglePeopleIcon />
                <Typography
                  value={t('NewBet.SummaryConditionsaTag')}
                  variant={TypographyTypes.TextMedium}
                  styleProps={{ color: PRIMARY_BLACK }}
                />
              </SummaryRow>
            </SummaryColumn>

            <LeftArrow color="black" />
          </SummaryRow>
          <StyledDivider />
        </>
      )}
      <SummaryRow onClick={() => handleStepSkip(NewBetStepValueTypes.betim)} betCreation={true}>
        {watch().betim !== undefined && (
          <SummaryColumn>
            <Typography
              value={t('NewBet.SummaryBetimTitle')}
              variant={TypographyTypes.H3}
              styleProps={{ color: PRIMARY_BLACK }}
            />
            <SummaryRow>
              <SummaryRow background={LIGHT_GREEN}>
                <SinglePeopleIcon />
                <Typography
                  value={watch().betim}
                  variant={TypographyTypes.TextMedium}
                  styleProps={{ color: PRIMARY_BLACK }}
                />
                <BetimIcon width={18} height={18} />
              </SummaryRow>
            </SummaryRow>
          </SummaryColumn>
        )}
        <LeftArrow color="black" />
      </SummaryRow>
      <StyledDivider />
      {watch().deadline && (
        <>
          <SummaryRow
            onClick={() => handleStepSkip(NewBetStepValueTypes.deadline)}
            betCreation={true}
          >
            <SummaryColumn>
              <Typography
                value={t('NewBet.SummaryDeadlineTitle')}
                variant={TypographyTypes.H3}
                styleProps={{ color: PRIMARY_BLACK }}
              />
              <SummaryRow background={LIGHT_GREEN}>
                <Typography
                  value={formatDate(watch().deadline)}
                  variant={TypographyTypes.TextMedium}
                  styleProps={{ color: PRIMARY_BLACK }}
                />
              </SummaryRow>
            </SummaryColumn>

            <LeftArrow color="black" />
          </SummaryRow>
          <StyledDivider />
        </>
      )}
      {watch().files && (
        <>
          <SummaryRow onClick={() => handleStepSkip(NewBetStepValueTypes.files)} betCreation={true}>
            <SummaryColumn>
              <Typography
                value={t('NewBet.SummaryFilesTitle')}
                variant={TypographyTypes.H3}
                styleProps={{ color: PRIMARY_BLACK }}
              />
              <SummaryRow gap={4}>
                {watch().files?.map((file: File, index: number) => (
                  <AvatarWrapper key={index}>
                    {file.type.includes('image') ? (
                      <StyledImage src={URL.createObjectURL(file)} />
                    ) : (
                      <StyledPDF>
                        <FileIcon />
                        {file.name}
                      </StyledPDF>
                    )}
                  </AvatarWrapper>
                ))}
              </SummaryRow>
            </SummaryColumn>

            <LeftArrow color="black" />
          </SummaryRow>
          <StyledDivider />
        </>
      )}
      {watch().supervisor && (
        <>
          <SummaryRow
            onClick={() => handleStepSkip(NewBetStepValueTypes.supervisor)}
            betCreation={true}
          >
            <SummaryColumn>
              <Typography
                value={t('NewBet.SummarySupervisorTitle')}
                variant={TypographyTypes.H3}
                styleProps={{ color: PRIMARY_BLACK }}
              />

              <ParticipantsRow>
                <SmallAvatar src={watch().supervisor?.[0]?.image}>
                  {watch().supervisor?.[0]?.fullName?.charAt(0) ?? ''}
                </SmallAvatar>
                <Typography
                  value={watch().supervisor?.[0]?.fullName || ''}
                  variant={TypographyTypes.TextMedium}
                  styleProps={{ color: PRIMARY_BLACK }}
                />
              </ParticipantsRow>
            </SummaryColumn>

            <LeftArrow color="black" />
          </SummaryRow>
          <StyledDivider />
        </>
      )}
    </SummaryContainer>
  );
};

export default NewBetSummary;
