import React, { useRef } from 'react';
import { Control, FieldValues, Path, useFormContext } from 'react-hook-form';
import { Typography } from '../../../../components/Topography/topography';
import { TypographyTypes } from '../../../../Theme/Typography/typography';
import { ReactComponent as UploadFileIcon } from '../../../../Theme/Icons/UploadIcon.svg';
import { ReactComponent as FileIcon } from '../../../../Theme/Icons/FilesIcon.svg';
import StyledButton from '../../../../components/Button/StyledButton';
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
} from '../Files/Files.styles';
import { useTranslation } from 'react-i18next';
import { Collapse } from '@mui/material';
import { User } from '../../../../api/interfaces';

interface NewBetFilesProps<T extends FieldValues> {
  control?: Control<T>;
  inputName: Path<T>;
}

const NewBetFiles = <T extends FieldValues>({
  inputName,
  control,
}: NewBetFilesProps<T>): JSX.Element => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setValue, getValues } = useFormContext<T>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const currentFiles = getValues(inputName) || [];
      setValue(inputName, [...currentFiles, files[0]] as unknown as T[Path<T>]);
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
    <div style={{ display: 'flex', gap: 30, flexDirection: 'column' }}>
      <FilesContainer onClick={handleClickContainer} style={{ cursor: 'pointer' }}>
        <UploadIconWrapper>
          <UploadFileIcon />
        </UploadIconWrapper>
        <FilesRow>
          <Typography
            value={t(`NewBet.uploadFilesTitle`)}
            variant={TypographyTypes.TextBig}
            styleProps={{ color: '#001845', fontWeight: 500 }}
          />
          <Typography
            value={t(`NewBet.uploadFilesSubtitle`)}
            variant={TypographyTypes.TextSmall}
            styleProps={{ color: '#7F8CB9', fontWeight: 400 }}
          />
        </FilesRow>
        <StyledButton
          value={t(`NewBet.uploadFilesbutton`)}
          styleProps={{
            width: '56%',
            backgroundColor: 'white',
            height: 32,
            color: '#15AB94',
            border: '2px solid #15AB94',
            marginBottom: 10,
          }}
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
