import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { ReactComponent as MinusIcon } from "../../Theme/Icons/Minus.svg";
import { Typography } from "../Topography/topography";
import { TypographyTypes } from "../../Theme/Typography/typography";
import { AddFilesDiv, hideLongNameStyles } from "./FileUploader.styles";
import { ReactComponent as AddIcon } from "../../Theme/Icons/AddGray.svg";
import { AddParticipantTag } from "./FileUploader.styles";
import { useTranslation } from "react-i18next";
interface FileUploaderProps {
  control: any;
  inputName: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({ control, inputName }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { t } = useTranslation();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFiles([...selectedFiles, file]);
    }
  };

  const handleRemoveFileChange = (file: File) => {
    setSelectedFiles(selectedFiles.filter((f) => f !== file));
  };

  return (
    <Controller
      name={inputName}
      control={control}
      render={({ field }) => (
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
              onChange={(e) => {
                handleFileChange(e);
                field.onChange(e);
              }}
              ref={field.ref}
            />
          </label>
        </AddFilesDiv>
      )}
    />
  );
};

export default FileUploader;
