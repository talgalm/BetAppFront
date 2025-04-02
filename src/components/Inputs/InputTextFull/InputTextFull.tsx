import { useEffect } from 'react';
import { Control, Controller, FieldValues, Path, PathValue } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Typography } from '../../Topography/topography';
import { TypographyTypes } from '../../../Theme/Typography/typography';
import { BetInput, NumOfChars, WidthDiv } from './InputTextFull.styles';

interface InputTextFullProps<T extends FieldValues> {
  control?: Control<T>;
  inputName: Path<T>;
  isSetHeight?: boolean;
  displayCharLimit?: boolean;
  placeholder?: string;
}

const InputTextFull = <T extends FieldValues>({
  control,
  inputName,
  isSetHeight = false,
  displayCharLimit = true,
  placeholder,
}: InputTextFullProps<T>): JSX.Element => {
  const { t } = useTranslation();
  const MAX_INPUT_LENGTH = 100;
  useEffect(() => {
    const inputElement = document.querySelector(
      `[name="${String(inputName)}"]`
    ) as HTMLInputElement | null;
    if (inputElement) {
      inputElement.focus();
    }
  }, [inputName]);

  return (
    <Controller<T>
      name={inputName}
      control={control}
      defaultValue={'' as PathValue<T, Path<T>>}
      render={({ field }) => (
        <WidthDiv>
          <BetInput
            placeholder={placeholder ?? t('Input.TextFull.Placeholder')}
            typography={TypographyTypes.TextMedium}
            isWriting={field.value.length > 0}
            setHeight={isSetHeight}
            {...field}
          />
          {displayCharLimit && (
            <NumOfChars>
              <Typography
                value={`${field.value.length} / ${MAX_INPUT_LENGTH}`}
                variant={TypographyTypes.H7}
              />
            </NumOfChars>
          )}
        </WidthDiv>
      )}
    />
  );
};

export default InputTextFull;
