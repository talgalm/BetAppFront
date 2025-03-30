import React from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';
import { Typography } from '../../../../components/Topography/topography';
import { TypographyTypes } from '../../../../Theme/Typography/typography';
import { ReactComponent as UploadFileIcon } from '../../../../Theme/Icons/UploadIcon.svg';
import StyledButton from '../../../../components/Button/StyledButton';
import { FilesContainer, FilesRow } from '../Files/Files.styles';
import { useTranslation } from 'react-i18next';

interface NewBetFilesProps<T extends FieldValues> {
  control?: Control<T>;
  inputName: Path<T>;
}

const NewBetFiles = <T extends FieldValues>({
  inputName,
  control,
}: NewBetFilesProps<T>): JSX.Element => {
  const { t } = useTranslation();
  return (
    <FilesContainer>
      <UploadFileIcon />
      <FilesRow>
        <Typography
          value={t(`NewBet.uploadFilesTitle`)}
          variant={TypographyTypes.H5}
          styleProps={{ color: '#001845', fontWeight: 500 }}
        />
        <Typography
          value={t(`NewBet.uploadFilesSubtitle`)}
          variant={TypographyTypes.H6}
          styleProps={{ color: '#7F8CB9', fontWeight: 400 }}
        />
      </FilesRow>
      <StyledButton
        value={t(`NewBet.uploadFilesbutton`)}
        styleProps={{
          width: '50%',
          backgroundColor: 'white',
          height: 40,
          color: '#15AB94',
          border: '2px solid #15AB94',
        }}
      />
    </FilesContainer>
  );
};

export default NewBetFiles;
