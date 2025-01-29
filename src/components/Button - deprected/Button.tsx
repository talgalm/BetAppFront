import React from 'react';
import { StyledButton } from './Button.styles';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  label?: string;
  disabled?: boolean;
  bgColor?: string;
  textColor?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ label = '', icon = '', bgColor, textColor, onClick }) => {
  return (
    <StyledButton onClick={onClick} bgColor={bgColor} textColor={textColor}>
      {label}
      {icon}
    </StyledButton>
  );
};

export default Button;
