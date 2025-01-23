import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ReactComponent as MinusIcon } from "../../Theme/Icons/Minus.svg";
import { Typography } from "../Topography/topography";
import { TypographyTypes } from "../../Theme/Typography/typography";
import { AddFilesDiv, hideLongNameStyles } from "./FileUploader.styles";
import { ReactComponent as AddIcon } from "../../Theme/Icons/AddGray.svg";
import { AddParticipantTag } from "./FileUploader.styles";
import { useTranslation } from "react-i18next";
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
          <AddParticipantTag key={index}>
            <MinusIcon onClick={() => handleRemoveFileChange(file)} />
            <Typography
              value={file.name}
              variant={TypographyTypes.H4}
              styleProps={hideLongNameStyles}
            />
          </AddParticipantTag>
        ))}

      <label
        htmlFor="file-upload"
        style={{ cursor: "pointer", display: "flex", gap: 10 }}
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
      </label>
    </AddFilesDiv>
  );
};

export default FileUploader;
