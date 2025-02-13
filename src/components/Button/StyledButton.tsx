import React from 'react';
import { ButtonStyles } from './StyledButton.styles';
import { Typography } from '../Topography/topography';
import { TypographyTypes } from '../../Theme/Typography/typography';
import { PRIMARY_COLOR } from '../../Theme/ColorTheme';

interface StyledButtonProps {
  value: string;
  buttonColor?: string;
  textColor?: string;
  onClick?: () => void;
  variant?: object;
  icon?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

const StyledButton: React.FC<StyledButtonProps> = ({
  value,
  buttonColor = PRIMARY_COLOR,
  textColor,
  onClick,
  variant = TypographyTypes.H5,
  icon,
  type,
}) => {
  return (
    <ButtonStyles buttonColor={buttonColor} onClick={onClick} type={type}>
      <Typography value={value} variant={variant} styleProps={{ color: textColor }} />
      {icon}
    </ButtonStyles>
  );
};

export default StyledButton;
