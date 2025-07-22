import { ActionRow } from '@pages/profile/Profile.styles';
import {
  ActionsContainer,
  HomeDivContainer,
  RowFixed,
  StyledDivider,
  VersionContainer,
} from './SupportPage.styles';
import { Typography } from '@components/Topography/typography';
import { TypographyTypes } from '@components/Topography/TypographyTypes';
import { ReactComponent as LeftArrow } from '@assets/icons/arrowLeftBlack.svg';
import { useTranslation } from 'react-i18next';
import { SECONDARY_BLACK } from '@theme/colorTheme';

const Support = () => {
  const { t } = useTranslation();

  const supportItems = [
    { label: t('Support.commonQuestions') },
    { label: t('Support.privacyPolicy') },
    { label: t('Support.contact') },
    { label: t('Support.accessibility') },
  ];

  const SupportItem = ({ label }: { label: string }) => (
    <>
      <ActionRow>
        <RowFixed>
          <Typography value={label} variant={TypographyTypes.H3} />
        </RowFixed>
        <LeftArrow />
      </ActionRow>
      <StyledDivider />
    </>
  );

  return (
    <HomeDivContainer>
      <Typography value={t('Profile.support')} variant={TypographyTypes.H1} />

      <ActionsContainer>
        <StyledDivider />
        {supportItems.map((item, index) => (
          <SupportItem key={index} label={item.label} />
        ))}
      </ActionsContainer>

      <VersionContainer>
        <Typography
          value={t('Support.version')}
          variant={TypographyTypes.TextSmall}
          styleProps={{ color: SECONDARY_BLACK }}
        />
      </VersionContainer>
    </HomeDivContainer>
  );
};

export default Support;
