import React from 'react';
import { useFormContext } from 'react-hook-form';
import { CreateBetInputs, newBetSteps, NewBetStepValueTypes } from '../../new-bet-steps';
import { Typography } from '@components/Topography/typography';
import { ReactComponent as EditIcon } from '@assets/icons/EditDark.svg';
import { ReactComponent as LeftArrow } from '@assets/icons/arrowLeftBlack.svg';
import { ReactComponent as SinglePeopleIcon } from '@assets/icons/SinglePeople.svg';
import { ReactComponent as FileIcon } from '@assets/icons/FilesIcon.svg';
import { ReactComponent as BetimIcon } from '@assets/icons/Betim.svg';
import {
  EllipsisTextStyle,
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

interface SummarySectionProps {
  title: string;
  onClick: () => void;
  children?: React.ReactNode;
}

const SummarySection: React.FC<SummarySectionProps> = ({ title, onClick, children }) => (
  <>
    <SummaryRow onClick={onClick} betCreation>
      <SummaryColumn>
        <Typography
          value={title}
          variant={TypographyTypes.H3}
          styleProps={{ color: PRIMARY_BLACK }}
        />
        {children}
      </SummaryColumn>
      <LeftArrow color={PRIMARY_BLACK} />
    </SummaryRow>
    <StyledDivider />
  </>
);

const NewBetSummary: React.FC = () => {
  const { watch } = useFormContext<CreateBetInputs>();
  const [, setActiveStep] = useAtom(ActiveStep);
  const { t } = useTranslation();

  const { name, participents, description, betim, deadline, files, supervisor } = watch();

  const handleStepSkip = (step: NewBetStepValueTypes) => {
    newBetSteps[step].skipToEnd = true;
    newBetSteps[step].progress = 90;
    setActiveStep(newBetSteps[step]);
  };

  return (
    <SummaryContainer>
      {name && (
        <SummaryRow onClick={() => handleStepSkip(NewBetStepValueTypes.name)} betCreation>
          <Typography
            value={name}
            variant={TypographyTypes.H2}
            styleProps={{ color: PRIMARY_BLACK }}
          />
          <EditIcon />
        </SummaryRow>
      )}
      <StyledDivider />

      {participents && (
        <SummarySection
          title={t('NewBet.SummaryParticipantsTitle')}
          onClick={() => handleStepSkip(NewBetStepValueTypes.participents)}
        >
          <ParticipantsRow>
            {participents.map((p, idx) => (
              <SmallAvatar key={idx} src={p.image}>
                {p.fullName?.charAt(0)}
              </SmallAvatar>
            ))}
          </ParticipantsRow>
        </SummarySection>
      )}

      {description && (
        <SummarySection
          title={t('NewBet.SummaryDescriptionTitle')}
          onClick={() => handleStepSkip(NewBetStepValueTypes.description)}
        >
          <Typography
            value={description}
            variant={TypographyTypes.TextBig}
            styleProps={EllipsisTextStyle}
          />
        </SummarySection>
      )}

      {participents?.some((p) => p.guess != null) && (
        <SummarySection
          title={t('NewBet.SummaryConditionsTitle')}
          onClick={() => handleStepSkip(NewBetStepValueTypes.Conditions)}
        >
          <SummaryRow background={TAG_PURPLE}>
            <SinglePeopleIcon />
            <Typography
              value={t('NewBet.SummaryConditionsaTag')}
              variant={TypographyTypes.TextMedium}
              styleProps={{ color: PRIMARY_BLACK }}
            />
          </SummaryRow>
        </SummarySection>
      )}

      {betim !== undefined && (
        <SummarySection
          title={t('NewBet.SummaryBetimTitle')}
          onClick={() => handleStepSkip(NewBetStepValueTypes.betim)}
        >
          <SummaryRow background={LIGHT_GREEN}>
            <SinglePeopleIcon />
            <Typography
              value={betim}
              variant={TypographyTypes.TextMedium}
              styleProps={{ color: PRIMARY_BLACK }}
            />
            <BetimIcon width={18} height={18} />
          </SummaryRow>
        </SummarySection>
      )}

      {deadline && (
        <SummarySection
          title={t('NewBet.SummaryDeadlineTitle')}
          onClick={() => handleStepSkip(NewBetStepValueTypes.deadline)}
        >
          <SummaryRow background={LIGHT_GREEN}>
            <Typography
              value={formatDate(deadline)}
              variant={TypographyTypes.TextMedium}
              styleProps={{ color: PRIMARY_BLACK }}
            />
          </SummaryRow>
        </SummarySection>
      )}

      {files && files.length > 0 && (
        <SummarySection
          title={t('NewBet.SummaryFilesTitle')}
          onClick={() => handleStepSkip(NewBetStepValueTypes.files)}
        >
          <SummaryRow gap={4}>
            {files.map((file, idx) => (
              <AvatarWrapper key={file.name || idx}>
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
        </SummarySection>
      )}

      {supervisor?.[0] && (
        <SummarySection
          title={t('NewBet.SummarySupervisorTitle')}
          onClick={() => handleStepSkip(NewBetStepValueTypes.supervisor)}
        >
          <ParticipantsRow>
            <SmallAvatar src={supervisor[0].image}>
              {supervisor[0].fullName?.charAt(0) ?? ''}
            </SmallAvatar>
            <Typography
              value={supervisor[0].fullName || ''}
              variant={TypographyTypes.TextMedium}
              styleProps={{ color: PRIMARY_BLACK }}
            />
          </ParticipantsRow>
        </SummarySection>
      )}
    </SummaryContainer>
  );
};

export default NewBetSummary;
