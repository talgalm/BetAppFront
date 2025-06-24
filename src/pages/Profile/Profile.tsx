import { useEffect, useRef, useState } from 'react';
import {
  Column,
  HomeDivContainer,
  InnerLoader,
  ProfileImage,
  ProfileImageWrapper,
  StatsContainer,
} from './Profile.styles';
import { useProfile } from '../../Providers/useProfile';
import { FileInput, useUpdateProfileImage } from './Hooks/useUpdateProfileImage';
import { DialogType, StyledDialog } from '../../components/StyledDialog/StyledDialog';
import { createDialogButtons } from '../../Layout/Header/buttons';
import { useUpdateUser } from './Hooks/useUpdateUser';
import { useTranslation } from 'react-i18next';
import { Typography } from '../../components/Topography/typography';
import { TypographyTypes } from '../../components/Topography/TypographyTypes';

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
    <>
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

      <HomeDivContainer>
        <StatsContainer>
          <Column>
            <Typography value={profile?.stats?.wins || 0} variant={TypographyTypes.H3} />
            <Typography value={t('Profile.wins')} variant={TypographyTypes.TextSmall} />
          </Column>
          <Column>
            <Typography value={profile?.stats?.draw || 0} variant={TypographyTypes.H3} />
            <Typography value={t('Profile.draw')} variant={TypographyTypes.TextSmall} />
          </Column>
          <Column>
            <Typography value={profile?.stats?.loses || 0} variant={TypographyTypes.H3} />
            <Typography value={t('Profile.loses')} variant={TypographyTypes.TextSmall} />
          </Column>
        </StatsContainer>
      </HomeDivContainer>

      <StyledDialog
        type={DialogType.ReplaceImage}
        open={open}
        closeModal={handleCloseModal}
        buttons={dialogButtons}
      />
    </>
  );
};

export default Profile;
