import React from 'react';

interface TopographyProps {
  value: string | number;
  variant?: React.CSSProperties;
  styleProps?: React.CSSProperties;
  onClick?(): void;
}

export const Typography: React.FC<TopographyProps> = ({ value, variant, styleProps, onClick }) => {
  const mergedStyles = styleProps ? { ...variant, ...styleProps } : variant;

  const transformedValue = typeof value === 'string' ? value.replaceAll('<br>', '\n') : value;

  return (
    <div
      onClick={onClick}
      style={{
        ...mergedStyles,
        whiteSpace: mergedStyles?.whiteSpace || 'pre-wrap',
        overflow: mergedStyles?.overflow || 'hidden',
        textOverflow: mergedStyles?.textOverflow || 'ellipsis',
        display: 'block',
      }}
    >
      {transformedValue}
    </div>
  );
};
