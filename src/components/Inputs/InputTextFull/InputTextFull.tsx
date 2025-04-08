import { useEffect } from 'react';
import { Control, Controller, FieldValues, Path, PathValue } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TypographyTypes } from '../../../Theme/Typography/typography';
import { BetInput, StyledTextField, IconWrapper, WidthDiv } from './InputTextFull.styles';

interface InputTextFullProps<T extends FieldValues> {
  control?: Control<T>;
  inputName?: Path<T>;
  extended?: boolean;
  displayCharLimit?: boolean;
  placeholder?: string;
  typography?: keyof typeof TypographyTypes;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const InputTextFull = <T extends FieldValues>({
  control,
  inputName,
  extended,
  placeholder,
  typography,
  icon: Icon,
}: InputTextFullProps<T>): JSX.Element => {
  const { t } = useTranslation();
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
              <StyledTextField
                fullWidth
                placeholder={placeholder ?? t('Input.TextFull.Placeholder')}
                variant="outlined"
                multiline={extended}
                rows={extended ? 4 : undefined}
                {...field}
              />
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
