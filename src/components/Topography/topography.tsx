import React from 'react';

interface TopographyProps {
  value: string | number;
  variant?: React.CSSProperties;
  styleProps?: React.CSSProperties;
}

export const Typography: React.FC<TopographyProps> = ({ value, variant, styleProps }) => {
  const mergedStyles = styleProps ? { ...variant, ...styleProps } : variant;

  const transformedValue = typeof value === 'string' ? value.replaceAll('<br>', '\n') : value;

  return (
    <div
      style={{
        ...mergedStyles,
        whiteSpace: 'pre-wrap',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {transformedValue}
    </div>
  );
};
