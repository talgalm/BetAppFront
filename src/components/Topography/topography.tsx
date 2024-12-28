import React from "react";

interface TopographyProps {
  value: string | number;
  variant?: React.CSSProperties;
}

export const Typography: React.FC<TopographyProps> = ({ value, variant }) => {
  return <div style={variant}>{value}</div>; 
};
