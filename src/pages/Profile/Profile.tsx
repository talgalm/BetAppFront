import { useEffect, useRef, useState } from 'react';
import {
  ActionRow,
  ActionsContainer,
  Column,
  HomeDivContainer,
  InnerLoader,
  ProfileHeaderContainer,
  ProfileHeaderTextContainer,
  ProfileImage,
  ProfileImageWrapper,
  Row,
  RowFixed,
  StatsContainer,
  StyledDivider,
} from './Profile.styles';
import { useProfile } from '@providers/useProfile';
import { FileInput, useUpdateProfileImage } from './hooks/useUpdateProfileImage';
import { DialogType, StyledDialog } from '@components/StyledDialog/StyledDialog';
import { createDialogButtons } from '@layout/Header/buttons';
import { useUpdateUser } from './hooks/useUpdateUser';
import { useTranslation } from 'react-i18next';
import { Typography } from '@components/Topography/typography';
import { TypographyTypes } from '@components/Topography/TypographyTypes';
import { ERROR2_COLOR, EXIT_RED, PRIMARY_GREEN, SECONDARY_ORANGE } from '@theme/colorTheme';
import { ReactComponent as WinsIcon } from '@assets/icons/profileIcons/winsIcon.svg';
import { ReactComponent as DrawIcon } from '@assets/icons/profileIcons/drawIcon.svg';
import { ReactComponent as LossIcon } from '@assets/icons/profileIcons/lossIcon.svg';
import { ReactComponent as SettingsIcon } from '@assets/icons/profileIcons/settingsIcon.svg';
import { ReactComponent as SupportIcon } from '@assets/icons/profileIcons/supportIcon.svg';
import { ReactComponent as LeftArrow } from '@assets/icons/arrowLeftBlack.svg';
import StyledButton from '@components/Button/StyledButton';
import { ThemeType } from '@theme/theme';
import { useLogout } from '@pages/auth/hooks/useLogout';
const Profile = () => {
  const [showImage, setShowImage] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageKey, setImageKey] = useState(0);
  const updateImage = useUpdateProfileImage();
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { data: profile } = useProfile();
  const [open, setOpen] = useState(false);
  const { mutate, isPending: isRemoving } = useUpdateUser();
  const { mutate: logout } = useLogout();

  const isUploading = updateImage.isPending;
  const isLoading = isUploading || isRemoving;

  const replaceImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
      setOpen(false);
    }
  };

  const handleCloseModal = () => setOpen(false);

  const handleRemoveImage = () => {
    if (!profile?.id) return;
    mutate(
      { userId: profile.id, data: { image: '' } },
      {
        onSuccess: () => {
          setOpen(false);
          setImageKey((prev) => prev + 1);
        },
        onError: (err) => console.error('Failed to remove image:', err.message),
      }
    );
  };

  const dialogButtons = createDialogButtons(
    DialogType.ReplaceImage,
    replaceImage,
    handleCloseModal,
    handleRemoveImage
  );

  useEffect(() => {
    setTimeout(() => setShowImage(true), 100);
  }, []);

  useEffect(() => {
    if (profile?.image) {
      setImageLoaded(false);
      setImageKey((prev) => prev + 1);
    }
  }, [profile?.image]);

  const handleAvatarClick = () => {
    if (!profile?.image && fileInputRef.current) {
      fileInputRef.current.click();
    } else {
      setOpen(true);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const input = { userId: profile?.id, profileImage: file } as FileInput;
    if (file) {
      setImageLoaded(false);
      updateImage.mutate(input, {
        onSuccess: () => {
          console.log('Image uploaded');
          setTimeout(() => {
            setImageKey((prev) => prev + 1);
          }, 100);
        },
        onError: (err) => console.error('Upload error:', err.message),
      });
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setShowImage(true);
      });
    });
  }, []);

  const handleImageError = () => {
    console.error('Image failed to load');
    setImageLoaded(false);
  };

  const getImageUrl = (url: string) => {
    if (!url) return '';
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}v=${imageKey}`;
  };

  return (
    <HomeDivContainer>
      <ProfileHeaderContainer>
        <ProfileImageWrapper onClick={handleAvatarClick}>
          <ProfileImage
            key={imageKey}
            enter={showImage && (!profile?.image || imageLoaded)}
            src={getImageUrl(profile?.image || '')}
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ cursor: 'pointer' }}
          />
          {(isLoading || (!imageLoaded && profile?.image)) && <InnerLoader />}
        </ProfileImageWrapper>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <ProfileHeaderTextContainer>
          <Typography value={profile?.fullName} variant={TypographyTypes.H1} />
          <Typography
            value={profile?.phoneNumber || profile?.email}
            variant={TypographyTypes.TextMedium}
          />
        </ProfileHeaderTextContainer>
      </ProfileHeaderContainer>
      <StatsContainer>
        <Typography value={'סטטיסטיקה'} variant={TypographyTypes.H3} />
        <Row>
          <Column>
            <WinsIcon />
            <Typography value={profile?.stats?.wins || 0} variant={TypographyTypes.H3} />
            <Typography
              value={t('Profile.wins')}
              variant={TypographyTypes.VerySmall}
              styleProps={{ color: PRIMARY_GREEN }}
            />
          </Column>
          <Column>
            <DrawIcon />
            <Typography value={profile?.stats?.draw || 0} variant={TypographyTypes.H3} />
            <Typography
              value={t('Profile.draw')}
              variant={TypographyTypes.VerySmall}
              styleProps={{ color: SECONDARY_ORANGE }}
            />
          </Column>
          <Column>
            <LossIcon />
            <Typography value={profile?.stats?.loses || 0} variant={TypographyTypes.H3} />
            <Typography
              value={t('Profile.loses')}
              variant={TypographyTypes.VerySmall}
              styleProps={{ color: ERROR2_COLOR }}
            />
          </Column>
        </Row>
      </StatsContainer>
      <ActionsContainer>
        <StyledDivider />
        <ActionRow>
          <LeftArrow />
          <RowFixed>
            <Typography value={t('Profile.settings')} variant={TypographyTypes.H3} />
            <SettingsIcon />
          </RowFixed>
        </ActionRow>
        <StyledDivider />
        <ActionRow>
          <LeftArrow />
          <RowFixed>
            <Typography value={t('Profile.support')} variant={TypographyTypes.H3} />
            <SupportIcon />
          </RowFixed>
        </ActionRow>
        <StyledDivider />
        <ActionRow>
          <LeftArrow />
          <RowFixed>
            <Typography value={t('Profile.info')} variant={TypographyTypes.H3} />
            <SupportIcon />
          </RowFixed>
        </ActionRow>
        <StyledDivider />
      </ActionsContainer>
      <StyledButton
        value={t(`NewBet.Approve`)}
        onClick={() => logout()}
        colorVariant={ThemeType.Secondary}
        styleProps={{ color: EXIT_RED }}
      />

      <StyledDialog
        type={DialogType.ReplaceImage}
        open={open}
        closeModal={handleCloseModal}
        buttons={dialogButtons}
      />
    </HomeDivContainer>
  );
};

export default Profile;
