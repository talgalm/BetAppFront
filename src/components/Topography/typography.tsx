import React from 'react';
import { useTheme } from '@mui/material/styles';
import { TypographyTypes } from './TypographyTypes';

interface TopographyProps {
  value: string | number | undefined;
  variant: TypographyTypes;
  styleProps?: React.CSSProperties;
  truncate?: boolean;
  onClick?(param?: any): void;
}

export const Typography: React.FC<TopographyProps> = ({
  value,
  variant,
  styleProps,
  truncate,
  onClick,
}) => {
  const theme = useTheme();

  // Access theme.typography[variant] using MUI's variant names
  const variantMap: Record<TypographyTypes, keyof typeof theme.typography> = {
    Header1: 'h1',
    Header2: 'h2',
    SectionTitle: 'h3',
    TextBig: 'subtitle1',
    TextMedium: 'subtitle2',
    TextSmall: 'body1',
    Caption: 'body2',
    Button: 'button',
  };

  const baseStyle = theme.typography[variantMap[variant]] as React.CSSProperties;
  const mergedStyles = { ...baseStyle, ...styleProps };

  const transformedValue = typeof value === 'string' ? value.replaceAll('<br>', '\n') : value;

  return (
    <div
      onClick={onClick}
      style={{
        ...mergedStyles,
        whiteSpace: truncate ? 'nowrap' : mergedStyles?.whiteSpace || 'pre-wrap',
        overflow: truncate ? 'hidden' : mergedStyles?.overflow || 'visible',
        textOverflow: truncate ? 'ellipsis' : mergedStyles?.textOverflow || 'clip',
        maxWidth: truncate ? '250px' : mergedStyles?.maxWidth || 'none',
        display: 'block',
      }}
    >
      {transformedValue}
    </div>
  );
};
