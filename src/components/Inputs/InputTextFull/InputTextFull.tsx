import { useState } from "react";
import { TypographyTypes } from "../../../Theme/Typography/typography";
import { Typography } from "../../Topography/topography";
import { BetInput, NumOfChars } from "./InputTextFull.styles";
import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";

interface InputTextFullProps {
  control: any;
  inputName: string;
}

const InputTextFull: React.FC<InputTextFullProps> = ({
  control,
  inputName,
}) => {
  const [descriptionInput, setDescriptionInput] = useState("");
  const { t } = useTranslation();

  return (
    <Controller
      name={inputName}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <div>
          <BetInput
            placeholder={t("Input.TextFull.Placeholder")}
            typography={TypographyTypes.H5}
            {...field}
          />
          <NumOfChars>
            <Typography
              value={`${field.value.length} / 100`}
              variant={TypographyTypes.H7}
            />
          </NumOfChars>
        </div>
      )}
    />
  );
};

export default InputTextFull;
