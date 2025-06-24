import React from 'react';
import { useFormContext } from 'react-hook-form';
import { CreateBetInputs, newBetSteps, NewBetStepValueTypes, Participant } from '../../Interface';
import { Typography } from '../../../../components/Topography/typography';
import { ReactComponent as EditIcon } from '../../../../Theme/Icons/EditDark.svg';
import { ReactComponent as LeftArrow } from '../../../../Theme/Icons/arrowLeftBlack.svg';
import { ReactComponent as SinglePeopleIcon } from '../../../../Theme/Icons/SinglePeople.svg';
import { ReactComponent as FileIcon } from '../../../../Theme/Icons/FilesIcon.svg';

import { ReactComponent as BetimIcon } from '../../../../Theme/Icons/Betim.svg';

import {
  ParticipantsRow,
  SmallAvatar,
  StyledDivider,
  SummaryColumn,
  SummaryContainer,
  SummaryRow,
} from './Summary.styles';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../../../../utils/Helpers';
import { useAtom } from 'jotai';
import { ActiveStep } from '../../../../Jotai/newBetAtoms';
import { AvatarWrapper, StyledImage, StyledPDF } from '../Files/Files.styles';
import { TypographyTypes } from '../../../../components/Topography/TypographyTypes';

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
            styleProps={{ color: 'black' }}
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
              styleProps={{ color: 'black' }}
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
                styleProps={{ color: 'black' }}
              />
              <Typography
                value={watch().description || ''}
                variant={TypographyTypes.TextBig}
                styleProps={{
                  color: 'black',
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
                styleProps={{ color: 'black' }}
              />
              <SummaryRow background={'#CED0EF'}>
                <SinglePeopleIcon />
                <Typography
                  value={t('NewBet.SummaryConditionsaTag')}
                  variant={TypographyTypes.TextMedium}
                  styleProps={{ color: 'black' }}
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
              styleProps={{ color: 'black' }}
            />
            <SummaryRow>
              <SummaryRow background={'#CEEFEA'}>
                <SinglePeopleIcon />
                <Typography
                  value={watch().betim}
                  variant={TypographyTypes.TextMedium}
                  styleProps={{ color: 'black' }}
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
                styleProps={{ color: 'black' }}
              />
              <SummaryRow background={'#CEEFEA'}>
                <Typography
                  value={formatDate(watch().deadline)}
                  variant={TypographyTypes.TextMedium}
                  styleProps={{ color: 'black' }}
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
                styleProps={{ color: 'black' }}
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
                styleProps={{ color: 'black' }}
              />

              <ParticipantsRow>
                <SmallAvatar src={watch().supervisor?.[0]?.image}>
                  {watch().supervisor?.[0]?.fullName?.charAt(0) ?? ''}
                </SmallAvatar>
                <Typography
                  value={watch().supervisor?.[0]?.fullName || ''}
                  variant={TypographyTypes.TextMedium}
                  styleProps={{ color: 'black' }}
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
