import { useEffect } from "react";
import { TypographyTypes } from "../../../Theme/Typography/typography";
import { Typography } from "../../Topography/topography";
import { BetInput, NumOfChars } from "./InputTextFull.styles";
import { useTranslation } from "react-i18next";
import { Controller, useFieldArray } from "react-hook-form";

interface InputTextFullProps {
  control: any;
  inputName: string;
}

const InputTextFull: React.FC<InputTextFullProps> = ({
  control,
  inputName,
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    const inputElement = document.querySelector(
      `[name="${inputName}"]`
    ) as HTMLInputElement | null;
    if (inputElement) {
      inputElement.focus();
    }
  }, [inputName]);

  return (
    <Controller
      name={inputName}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <div style={{ width: "100%" }}>
          <BetInput
            placeholder={t("Input.TextFull.Placeholder")}
            typography={TypographyTypes.H5}
            isWriting={field.value.length > 0}
            setHeight={true}
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
