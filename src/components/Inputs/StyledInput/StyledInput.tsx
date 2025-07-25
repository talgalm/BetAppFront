import { Control, Controller, FieldValues, Path, PathValue } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyledTextField, WidthDiv, IconWrapperEnd, IconWrapperStart } from './StyledInput.styles';
import { TypographyTypes } from '../../Topography/TypographyTypes';

interface InputTextFullProps<T extends FieldValues> {
  label?: string;
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
  onAnyChange?: () => void;
}

const StyledInput = <T extends FieldValues>({
  label,
  control,
  inputName,
  extended,
  placeholder,
  startIcon: StartIcon,
  endIcon: EndIcon,
  startIconOnClick,
  endIconOnClick,
  maskValue,
  onAnyChange,
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
              <WidthDiv dir="rtl">
                <IconWrapperStart>
                  {StartIcon && <StartIcon onClick={startIconOnClick} />}
                </IconWrapperStart>

                <StyledTextField
                  label={label}
                  fullWidth
                  placeholder={placeholder ?? t('Input.TextFull.Placeholder')}
                  variant={label ? 'filled' : 'outlined'}
                  multiline={extended}
                  type={maskValue ? 'password' : 'text'}
                  rows={extended ? 2 : undefined}
                  {...field}
                  marginExtand={extended}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  startIconGap={StartIcon !== undefined}
                  isLabel={label !== undefined}
                  onChange={(e) => {
                    field.onChange(e);
                    onAnyChange?.();
                  }}
                />
                {<IconWrapperEnd>{EndIcon && <EndIcon onClick={endIconOnClick} />}</IconWrapperEnd>}
              </WidthDiv>
            );
          }}
        />
      ) : (
        <WidthDiv>
          <IconWrapperStart>
            {StartIcon && (
              <StartIcon
                onClick={(e) => {
                  startIconOnClick?.(e);
                  onAnyChange?.();
                }}
              />
            )}
          </IconWrapperStart>
          <StyledTextField
            fullWidth
            placeholder={placeholder ?? t('Input.TextFull.Placeholder')}
            variant="outlined"
            multiline={extended}
            rows={extended ? 4 : undefined}
            startIconGap={StartIcon !== null}
            label={label}
          />
          {<IconWrapperEnd>{EndIcon && <EndIcon />}</IconWrapperEnd>}
        </WidthDiv>
      )}
    </>
  );
};

export default StyledInput;
