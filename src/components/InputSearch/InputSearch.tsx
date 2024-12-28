import React, { useState } from "react";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";
import {
  ErrorDiv,
  StyledContainer,
  StyledInput,
  StyledInputWrapper,
  VisibilityButton,
} from "./InputSearch.styles";

// Import icons from react-icons
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

type InputProps<TFormValues extends FieldValues> = {
  label?: string;
  type: string;
  placeholder?: string;
  register: UseFormRegister<TFormValues>;
  name: Path<TFormValues>;
  validation?: object;
  error?: string;
};

const Input = <TFormValues extends FieldValues>({
  label,
  type,
  placeholder,
  register,
  name,
  validation = {},
  error,
}: InputProps<TFormValues>) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <StyledContainer>
      {label && <label htmlFor={name}>{label}</label>}
      <StyledInputWrapper>
        <StyledInput
          id={name}
          type={showPassword && type === "password" ? "text" : type} // Toggle type based on state
          placeholder={placeholder}
          {...register(name, validation)}
        />
        {type === "password" && (
          <VisibilityButton type="button" onClick={togglePasswordVisibility}>
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </VisibilityButton>
        )}
      </StyledInputWrapper>
      {error && <ErrorDiv>{error}</ErrorDiv>}
    </StyledContainer>
  );
};

export default Input;
