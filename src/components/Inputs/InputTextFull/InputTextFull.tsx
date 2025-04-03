import { useEffect } from 'react';
import { Control, Controller, FieldValues, Path, PathValue } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Typography } from '../../Topography/topography';
import { TypographyTypes } from '../../../Theme/Typography/typography';
import { BetInput, IconWrapper, NumOfChars, WidthDiv } from './InputTextFull.styles';

interface InputTextFullProps<T extends FieldValues> {
  control?: Control<T>;
  inputName?: Path<T>;
  isSetHeight?: boolean;
  displayCharLimit?: boolean;
  placeholder?: string;
  typography?: keyof typeof TypographyTypes;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const InputTextFull = <T extends FieldValues>({
  control,
  inputName,
  isSetHeight = false,
  displayCharLimit = true,
  placeholder,
  typography,
  icon: Icon,
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
    <>
      {inputName ? (
        <Controller<T>
          name={inputName}
          control={control}
          defaultValue={'' as PathValue<T, Path<T>>}
          render={({ field }) => (
            <WidthDiv>
              {<IconWrapper>{Icon && <Icon />}</IconWrapper>}
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
                    variant={TypographyTypes.TextSmall}
                  />
                </NumOfChars>
              )}
            </WidthDiv>
          )}
        />
      ) : (
        <WidthDiv>
          {Icon && (
            <IconWrapper>
              <Icon />
            </IconWrapper>
          )}
          <BetInput
            placeholder={placeholder ?? t('Input.TextFull.Placeholder')}
            typography={
              typeof typography === 'string'
                ? TypographyTypes[typography]
                : TypographyTypes.TextMedium
            }
            setHeight={true}
            isIcon={Icon !== null}
          />
        </WidthDiv>
      )}
    </>
  );
};

export default InputTextFull;
