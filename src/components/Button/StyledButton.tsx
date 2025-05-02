import React from 'react';
import { ButtonStyles } from './StyledButton.styles';
import { Typography } from '../Topography/topography';
import { useTheme } from '@mui/material/styles';
import { ThemeType } from '../../Theme/theme';
import { TypographyTypes } from '../Topography/TypographyTypes';

interface StyledButtonProps {
  value?: string;
  textColor?: string;
  onClick?: () => void;
  variant?: object;
  icon?: React.ReactNode;
  disabled?: boolean;
  styleProps?: React.CSSProperties;
  colorVariant?: 'primary' | 'secondary' | 'error' | 'success' | ThemeType; // Theme-based colors
  type?: 'button' | 'reset' | 'submit' | undefined;
}

const StyledButton: React.FC<StyledButtonProps> = ({
  value,
  onClick,
  variant = TypographyTypes.Button,
  icon,
  disabled,
  styleProps,
  colorVariant = 'primary',
  type,
}) => {
  const theme = useTheme();

  const handleClick = disabled ? undefined : onClick;
  const mergedStyles = styleProps && { ...styleProps };

  // Get color from theme palette
  const buttonColor = disabled
    ? theme.palette.action.disabledBackground
    : theme.palette[colorVariant]?.main || theme.palette.primary.main;

  return (
    <ButtonStyles
      type={type}
      onClick={handleClick}
      disabled={disabled}
      style={{ backgroundColor: buttonColor, ...mergedStyles }}
    >
      {value && (
        <Typography
          value={value}
          variant={TypographyTypes.Button}
          styleProps={{ color: theme.palette[colorVariant].contrastText }}
        />
      )}
      {icon}
    </ButtonStyles>
  );
};

export default StyledButton;
