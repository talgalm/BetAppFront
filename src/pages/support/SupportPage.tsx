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

  return (
    <HomeDivContainer>
      <Typography value={t('Profile.support')} variant={TypographyTypes.H1} />
      <ActionsContainer>
        <StyledDivider />
        <ActionRow>
          <RowFixed>
            <Typography value={t('Support.commonQuetions')} variant={TypographyTypes.H3} />
          </RowFixed>
          <LeftArrow />
        </ActionRow>
        <StyledDivider />
        <ActionRow>
          <RowFixed>
            <Typography value={t('Support.privacyPolicy')} variant={TypographyTypes.H3} />
          </RowFixed>
          <LeftArrow />
        </ActionRow>
        <StyledDivider />
        <ActionRow>
          <RowFixed>
            <Typography value={t('Support.contact')} variant={TypographyTypes.H3} />
          </RowFixed>
          <LeftArrow />
        </ActionRow>
        <StyledDivider />
        <ActionRow>
          <RowFixed>
            <Typography value={t('Support.accessibility')} variant={TypographyTypes.H3} />
          </RowFixed>
          <LeftArrow />
        </ActionRow>
        <StyledDivider />
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
