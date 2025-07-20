import { Typography } from '@components/Topography/typography';
import {
  CloseAccountContainer,
  HomeDivContainer,
  NotificationContainer,
} from './SettingsPage.styles';
import { TypographyTypes } from '@components/Topography/TypographyTypes';
import { useTranslation } from 'react-i18next';
import SimpleToggle from '@components/Toggle/Toggle';
import { ReactComponent as CloseAccountIcon } from '@assets/icons/profileIcons/closeAccountIcon.svg';
import { ERROR2_COLOR } from '@theme/colorTheme';

const Settings = () => {
  const { t } = useTranslation();

  return (
    <HomeDivContainer>
      <Typography value={t('Profile.settings')} variant={TypographyTypes.H1} />
      <NotificationContainer>
        <div>
          <Typography
            value={t('Settings.header')}
            variant={TypographyTypes.TextSmall}
            styleProps={{ color: 'black' }}
          />
          <Typography value={t('Settings.content')} variant={TypographyTypes.TextMedium} />
        </div>
        <SimpleToggle />
      </NotificationContainer>
      <CloseAccountContainer>
        <Typography
          value={t('Settings.closeAccount')}
          variant={TypographyTypes.TextSmall}
          styleProps={{ color: ERROR2_COLOR }}
        />
        <CloseAccountIcon />
      </CloseAccountContainer>
    </HomeDivContainer>
  );
};

export default Settings;
