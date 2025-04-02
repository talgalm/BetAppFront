import React from 'react';
import { useFormContext } from 'react-hook-form';
import { CreateFormInputs, newBetSteps, NewBetStepValueTypes } from '../../Interface';
import { Typography } from '../../../../components/Topography/topography';
import { TypographyTypes } from '../../../../Theme/Typography/typography';
import { ReactComponent as EditIcon } from '../../../../Theme/Icons/EditDark.svg';
import { ReactComponent as LeftArrow } from '../../../../Theme/Icons/arrowLeftBlack.svg';
import { ReactComponent as SinglePeopleIcon } from '../../../../Theme/Icons/SinglePeople.svg';
import { ReactComponent as MultiPeopleIcon } from '../../../../Theme/Icons/MultiPeople.svg';
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
import { User } from '../../../../api/interfaces';
import { formatDate } from '../../../../utils/Helpers';
import { useAtom } from 'jotai';
import { ActiveStep } from '../../../../Jotai/newBetAtoms';

const NewBetSummary: React.FC = () => {
  const { watch } = useFormContext<CreateFormInputs>();
  const [, setActiveStep] = useAtom(ActiveStep);

  const { t } = useTranslation();

  const handleStepSkip = (stepToSkip: NewBetStepValueTypes) => {
    newBetSteps[stepToSkip].skipToEnd = true;
    newBetSteps[stepToSkip].progress = 100;
    setActiveStep(newBetSteps[stepToSkip]);
  };

  return (
    <SummaryContainer>
      <SummaryRow onClick={() => handleStepSkip(NewBetStepValueTypes.Name)}>
        {watch().Name && (
          <Typography
            value={watch().Name}
            variant={TypographyTypes.H4}
            styleProps={{ color: 'black' }}
          />
        )}
        <EditIcon />
      </SummaryRow>
      <StyledDivider />
      <SummaryRow onClick={() => handleStepSkip(NewBetStepValueTypes.Participants)}>
        {watch().Participants && (
          <SummaryColumn>
            <Typography
              value={t('NewBet.SummaryParticipantsTitle')}
              variant={TypographyTypes.H5}
              styleProps={{ color: 'black' }}
            />
            <ParticipantsRow>
              {watch().Participants?.map((participant: User, index) => (
                <SmallAvatar key={index}>{participant.fullName?.charAt(0)}</SmallAvatar>
              ))}
            </ParticipantsRow>
          </SummaryColumn>
        )}
        <LeftArrow color="black" />
      </SummaryRow>
      <StyledDivider />
      <SummaryRow onClick={() => handleStepSkip(NewBetStepValueTypes.Description)}>
        {watch().Description && (
          <SummaryColumn>
            <Typography
              value={t('NewBet.SummaryDescriptionTitle')}
              variant={TypographyTypes.H5}
              styleProps={{ color: 'black' }}
            />
            <Typography
              value={watch().Description || ''}
              variant={TypographyTypes.H4}
              styleProps={{
                color: 'black',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '300px',
              }}
            />
          </SummaryColumn>
        )}
        <LeftArrow color="black" />
      </SummaryRow>
      <StyledDivider />
      <SummaryRow onClick={() => handleStepSkip(NewBetStepValueTypes.Conditions)}>
        {watch().Conditions && (
          <SummaryColumn>
            <Typography
              value={t('NewBet.SummaryConditionsTitle')}
              variant={TypographyTypes.H5}
              styleProps={{ color: 'black' }}
            />
            <SummaryRow background={'#CED0EF'}>
              <SinglePeopleIcon />
              <Typography
                value={t('NewBet.SummaryConditionsaTag')}
                variant={TypographyTypes.H7}
                styleProps={{ color: 'black' }}
              />
            </SummaryRow>
          </SummaryColumn>
        )}
        <LeftArrow color="black" />
      </SummaryRow>
      <StyledDivider />
      <SummaryRow onClick={() => handleStepSkip(NewBetStepValueTypes.Coins)}>
        {watch().Coins !== undefined && (
          <SummaryColumn>
            <Typography
              value={t('NewBet.SummaryBetimTitle')}
              variant={TypographyTypes.H5}
              styleProps={{ color: 'black' }}
            />
            <SummaryRow>
              <SummaryRow background={'#CEEFEA'}>
                <SinglePeopleIcon />
                <Typography
                  value={watch().Coins}
                  variant={TypographyTypes.H7}
                  styleProps={{ color: 'black' }}
                />
                <BetimIcon width={18} height={18} />
              </SummaryRow>
              {'X'}
              <SummaryRow background={'#CEEFEA'}>
                <MultiPeopleIcon />
                <Typography
                  value={watch().Coins * (watch().Participants?.length ?? 1)}
                  variant={TypographyTypes.H7}
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
      <SummaryRow onClick={() => handleStepSkip(NewBetStepValueTypes.Deadline)}>
        {watch().Deadline && (
          <SummaryColumn>
            <Typography
              value={t('NewBet.SummaryDeadlineTitle')}
              variant={TypographyTypes.H5}
              styleProps={{ color: 'black' }}
            />
            <SummaryRow background={'#CEEFEA'}>
              <Typography
                value={formatDate(watch().Deadline)}
                variant={TypographyTypes.H7}
                styleProps={{ color: 'black' }}
              />
            </SummaryRow>
          </SummaryColumn>
        )}
        <LeftArrow color="black" />
      </SummaryRow>
      <StyledDivider />
      <SummaryRow onClick={() => handleStepSkip(NewBetStepValueTypes.Supervisor)}>
        {watch().Supervisor && (
          <SummaryColumn>
            <Typography
              value={t('NewBet.SummarySupervisorTitle')}
              variant={TypographyTypes.H5}
              styleProps={{ color: 'black' }}
            />

            <ParticipantsRow>
              <SmallAvatar>{watch().Supervisor?.[0]?.fullName?.charAt(0) ?? ''}</SmallAvatar>
              <Typography
                value={watch().Supervisor?.[0]?.fullName || ''}
                variant={TypographyTypes.H5}
                styleProps={{ color: 'black' }}
              />
            </ParticipantsRow>
          </SummaryColumn>
        )}
        <LeftArrow color="black" />
      </SummaryRow>
      <StyledDivider />
    </SummaryContainer>
  );
};

export default NewBetSummary;
