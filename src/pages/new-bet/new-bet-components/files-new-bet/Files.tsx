import React, { useRef } from 'react';
import { Control, FieldValues, Path, useFormContext } from 'react-hook-form';
import { Typography } from '@components/Topography/typography';
import { ReactComponent as UploadFileIcon } from '@assets/icons/UploadIcon.svg';
import { ReactComponent as FileIcon } from '@assets/icons/FilesIcon.svg';
import StyledButton from '@components/Button/StyledButton';
import {
  AvatarWrapper,
  CloseButton,
  CloseIconStyled,
  FilesContainer,
  FilesRow,
  ParticipantsCollapseContainer,
  ParticipantsCollapseRow,
  SelectedContainer,
  StyledImage,
  StyledPDF,
  UploadIconWrapper,
} from './Files.styles';
import { useTranslation } from 'react-i18next';
import { Collapse } from '@mui/material';
import { ErrorHandler } from '@errors/ErrorHandler';
import { useErrorBoundary } from 'react-error-boundary';
import { ErrorTypes } from '@errors/errors';
import { TypographyTypes } from '@components/Topography/TypographyTypes';
import { PRIMARY_GREEN } from '@theme/colorTheme';

interface NewBetFilesProps<T extends FieldValues> {
  control?: Control<T>;
  inputName: Path<T>;
}

const NewBetFiles = <T extends FieldValues>({
  inputName,
  control,
}: NewBetFilesProps<T>): JSX.Element => {
  const { t } = useTranslation();
  const { showBoundary } = useErrorBoundary();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setValue, getValues } = useFormContext<T>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.size > 25 * 1024 * 1024) {
        ErrorHandler(showBoundary, ErrorTypes.FileTooBig);
      }
      const currentFiles = getValues(inputName) || [];
      setValue(inputName, [...currentFiles, file] as unknown as T[Path<T>]);
    }
  };

  const handleClickContainer = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = (fileToRemove: File) => {
    const currentFiles = getValues(inputName) || [];
    const updatedFiles = currentFiles.filter((file: File) => file !== fileToRemove);
    setValue(inputName, updatedFiles as unknown as T[Path<T>]);
  };

  return (
    <div style={{ display: 'flex', gap: 30, flexDirection: 'column', marginBottom: 50 }}>
      <FilesContainer onClick={handleClickContainer} style={{ cursor: 'pointer' }}>
        <UploadIconWrapper>
          <UploadFileIcon />
        </UploadIconWrapper>
        <FilesRow>
          <Typography
            value={t(`NewBet.uploadFilesTitle`)}
            variant={TypographyTypes.TextBig}
            styleProps={{ color: '#001845', fontWeight: 400 }}
          />
          <Typography
            value={t(`NewBet.uploadFilesSubtitle`)}
            variant={TypographyTypes.TextSmall}
            styleProps={{ color: '#9798A2', fontWeight: 500 }}
          />
        </FilesRow>
        <StyledButton
          value={t(`NewBet.uploadFilesbutton`)}
          styleProps={{
            width: '56%',
            backgroundColor: 'white',
            height: 32,
            marginTop: 8,
            border: `2px solid ${PRIMARY_GREEN}`,
            marginBottom: 10,
          }}
          colorVariant="secondary"
          onClick={() => fileInputRef.current?.click()}
        />
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
          name={inputName}
        />
      </FilesContainer>
      <Collapse
        in={Array.isArray(getValues(inputName)) && getValues(inputName).length > 0}
        timeout="auto"
        unmountOnExit
      >
        <SelectedContainer>
          {Array.isArray(getValues(inputName)) &&
            getValues(inputName).map((file: File, index: number) => (
              <ParticipantsCollapseContainer key={index}>
                <ParticipantsCollapseRow key={index}>
                  <AvatarWrapper>
                    {file.type.includes('image') ? (
                      <StyledImage src={URL.createObjectURL(file)} />
                    ) : (
                      <StyledPDF>
                        <FileIcon />
                        {file.name}
                      </StyledPDF>
                    )}
                    <CloseButton onClick={() => handleRemoveFile(file)}>
                      <CloseIconStyled />
                    </CloseButton>
                  </AvatarWrapper>
                </ParticipantsCollapseRow>
              </ParticipantsCollapseContainer>
            ))}
        </SelectedContainer>
      </Collapse>
    </div>
  );
};

export default NewBetFiles;
