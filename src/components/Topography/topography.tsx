import React from "react";

interface TopographyProps {
  value: string | number;
  variant?: React.CSSProperties;
  update?: React.CSSProperties;
}

export const Typography: React.FC<TopographyProps> = ({
  value,
  variant,
  update,
}) => {
  const mergedStyles = update ? { ...variant, ...update } : variant;

  return <div style={mergedStyles}>{value}</div>;
};
