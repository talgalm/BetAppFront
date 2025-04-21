import { Control, Controller, FieldValues, Path, PathValue } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TypographyTypes } from '../../../Theme/Typography/typography';
import { StyledTextField, WidthDiv, IconWrapperEnd, IconWrapperStart } from './StyledInput.styles';

interface InputTextFullProps<T extends FieldValues> {
  control?: Control<T>;
  inputName?: Path<T>;
  extended?: boolean;
  displayCharLimit?: boolean;
  placeholder?: string;
  typography?: keyof typeof TypographyTypes;
  startIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  endIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  startIconOnClick?: (param?: any) => void;
  endIconOnClick?: (param?: any) => void;
  maskValue?: boolean;
}

const StyledInput = <T extends FieldValues>({
  control,
  inputName,
  extended,
  placeholder,
  startIcon: StartIcon,
  endIcon: EndIcon,
  startIconOnClick,
  endIconOnClick,
  maskValue,
}: InputTextFullProps<T>): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      {inputName ? (
        <Controller<T>
          name={inputName}
          control={control}
          defaultValue={'' as PathValue<T, Path<T>>}
          render={({ field, fieldState }) => {
            return (
              <WidthDiv>
                {
                  <IconWrapperStart>
                    {StartIcon && <StartIcon onClick={startIconOnClick} />}
                  </IconWrapperStart>
                }
                <StyledTextField
                  fullWidth
                  placeholder={placeholder ?? t('Input.TextFull.Placeholder')}
                  variant="outlined"
                  multiline={extended}
                  type={maskValue ? 'password' : 'text'}
                  rows={extended ? 2 : undefined}
                  {...field}
                  marginExtand={extended}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
                {<IconWrapperEnd>{EndIcon && <EndIcon onClick={endIconOnClick} />}</IconWrapperEnd>}
              </WidthDiv>
            );
          }}
        />
      ) : (
        <WidthDiv>
          <StyledTextField
            fullWidth
            placeholder={placeholder ?? t('Input.TextFull.Placeholder')}
            variant="outlined"
            multiline={extended}
            rows={extended ? 4 : undefined}
          />
          {<IconWrapperEnd>{EndIcon && <EndIcon />}</IconWrapperEnd>}
        </WidthDiv>
      )}
    </>
  );
};

export default StyledInput;
