import { useEffect } from "react";
import { TypographyTypes } from "../../../Theme/Typography/typography";
import { Typography } from "../../Topography/topography";
import { BetInput, NumOfChars, WidthDiv } from "./InputTextFull.styles";
import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";

interface InputTextFullProps {
  control: any;
  inputName: string;
  isSetHeight?: boolean;
}

const InputTextFull: React.FC<InputTextFullProps> = ({
  control,
  inputName,
  isSetHeight,
}) => {
  const MAX_INPUT_LENGTH = 100;
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
        <WidthDiv>
          <BetInput
            placeholder={t("Input.TextFull.Placeholder")}
            typography={TypographyTypes.H5}
            isWriting={field.value.length > 0}
            setHeight={isSetHeight}
            {...field}
          />
          <NumOfChars>
            <Typography
              value={`${field.value.length} / ${MAX_INPUT_LENGTH}`}
              variant={TypographyTypes.H7}
            />
          </NumOfChars>
        </WidthDiv>
      )}
    />
  );
};

export default InputTextFull;
