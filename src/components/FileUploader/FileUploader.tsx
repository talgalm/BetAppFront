import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ReactComponent as CloseIcon } from "../../Theme/Icons/Close.svg";
import { Typography } from "../Topography/topography";
import { TypographyTypes } from "../../Theme/Typography/typography";
import { AddFilesDiv, hideLongNameStyles, ParticipantTag } from "./FileUploader.styles";
import { ReactComponent as AddIcon } from "../../Theme/Icons/AddGray.svg";
import { AddParticipantTag } from "./FileUploader.styles";
import { useTranslation } from "react-i18next";
import { BORDER_COLOR_sec } from "../../Theme/ColorTheme";
interface FileUploaderProps {
  inputName: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({ inputName }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { t } = useTranslation();
  const { setValue } = useFormContext();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFiles([...selectedFiles, file]);
    }
  };

  useEffect(() => {
    setValue(inputName, selectedFiles);
  }, [selectedFiles]);

  const handleRemoveFileChange = (file: File) => {
    setSelectedFiles(selectedFiles.filter((f) => f !== file));
  };

  return (
    <AddFilesDiv>
      {selectedFiles &&
        selectedFiles.map((file, index) => (
          <ParticipantTag key={index} borderColor={BORDER_COLOR_sec}>
            <CloseIcon onClick={() => handleRemoveFileChange(file)} width={24} height={24}/>
            <Typography
              value={file.name}
              variant={TypographyTypes.H4}
              styleProps={hideLongNameStyles}
            />
          </ParticipantTag>
        ))}
      <ParticipantTag
        onClick={() => document.getElementById("file-upload")?.click()}
        style={{ cursor: "pointer" }}
      >
        <AddIcon />
        <Typography
          value={t("Input.TextPoints.AddFile")}
          variant={TypographyTypes.H4}
        />
        <input
          id="file-upload"
          type="file"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </ParticipantTag>
    </AddFilesDiv>
  );
};

export default FileUploader;
