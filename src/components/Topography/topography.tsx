import React from "react";

interface TopographyProps {
  value: string | number;
  variant?: React.CSSProperties;
  styleProps?: React.CSSProperties;
}

export const Typography: React.FC<TopographyProps> = ({
  value,
  variant,
  styleProps: styleProps,
}) => {
  const mergedStyles = styleProps ? { ...variant, ...styleProps } : variant;

  return <div style={mergedStyles}>{value}</div>;
};
