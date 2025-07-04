import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { VerificationContainer } from '../Header.styles';
import { ReactComponent as RedCloseIcon } from '@assets/icons/layoutIcons/RedClose.svg';
import { Typography } from '@components/Topography/typography';
import { TypographyTypes } from '@components/Topography/TypographyTypes';
import { User } from '@interfaces/User.interface';
import { ERROR2_COLOR } from '@theme/colorTheme';

interface EmailVerificationBannerProps {
  user: User | null | undefined;
}

const EmailVerificationBanner = ({ user }: EmailVerificationBannerProps) => {
  const [verify, setVerify] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (user?.verifyEmail === false) {
      const dismissed = sessionStorage.getItem('verifyDismissed');
      setVerify(dismissed !== 'true');
    }
  }, [user]);

  const handleDismiss = () => {
    setVerify(false);
    sessionStorage.setItem('verifyDismissed', 'true');
  };

  if (!user || !verify || user.verifyEmail !== false) {
    return null;
  }

  return (
    <VerificationContainer>
      <Typography
        value={`שלחנו לך קוד אימות למייל ${user.email}`}
        variant={TypographyTypes.TextSmall}
        styleProps={{ color: ERROR2_COLOR }}
      />
      <RedCloseIcon onClick={handleDismiss} />
    </VerificationContainer>
  );
};

export default EmailVerificationBanner;
