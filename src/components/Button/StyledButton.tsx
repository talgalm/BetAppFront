import React from 'react';
import { ButtonStyles } from './StyledButton.styles';
import { Typography } from '../Topography/topography';
import { TypographyTypes } from '../../Theme/Typography/typography';
import { PRIMARY_COLOR } from '../../Theme/ColorTheme';

interface StyledButtonProps {
  value?: string;
  textColor?: string;
  onClick?: () => void;
  variant?: object;
  icon?: React.ReactNode;
  disabled?: boolean;
  styleProps?: React.CSSProperties;
}

const StyledButton: React.FC<StyledButtonProps> = ({
  value,
  onClick,
  variant = TypographyTypes.H10,
  icon,
  disabled,
  textColor,
  styleProps,
}) => {
  const handleClick = disabled ? undefined : onClick;
  const mergedStyles = styleProps && { ...styleProps };

  return (
    <ButtonStyles onClick={handleClick} disabled={disabled} style={{ ...mergedStyles }}>
      {value && <Typography value={value} variant={variant} styleProps={{ color: textColor }} />}
      {icon}
    </ButtonStyles>
  );
};

export default StyledButton;
