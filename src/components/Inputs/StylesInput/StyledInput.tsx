import { Control, Controller, FieldValues, Path, PathValue } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { InputContainer, WInput, IconWrapper } from './StyledInput.styles';
import { TypographyTypes } from '../../../Theme/Typography/typography';

interface StyledInputProps<T extends FieldValues> {
  control: Control<T>;
  inputName: string;
  displayCharLimit?: boolean;
  placeholder?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const StyledInput = <T extends FieldValues>({
  control,
  inputName,
  displayCharLimit,
  placeholder,
  icon: Icon,
}: StyledInputProps<T>): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Controller<T>
      name={inputName as Path<T>}
      control={control}
      defaultValue={'' as PathValue<T, Path<T>>}
      render={({ field }) => (
        <InputContainer>
          {<IconWrapper>{Icon && <Icon color="#9798A2" />}</IconWrapper>}
          <WInput
            placeholder={placeholder}
            typography={TypographyTypes.H5}
            isWriting={field.value.length > 0}
            {...field}
          />
        </InputContainer>
      )}
    />
  );
};

export default StyledInput;
