export const baseStyle = {
  display: "inline-flex",
  padding: "4px 8px",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
  borderRadius: "4px",
  width: "80px",
  letterSpacing: "0.2px",
  
};

export const TagStyles = {
  Low: {
    ...baseStyle,
    border: "1.5px solid #228B22",
    color: "#228B22",
  },
  Mid: {
    ...baseStyle,
    border: "1.5px solid #DCB414",
    color: "#DCB414",
  },
  High: {
    ...baseStyle,
    border: "1.5px solid #D43235",
    color: "#D43235",
  },
  PARTICIPANTS: {
    ...baseStyle,
    border: "1.5px solid #7F8CB9",
    color: "#7F8CB9",
    
  },
  POINTS: {
    ...baseStyle,
    border: "1.5px solid #4569E3",
    color: "#4569E3",
  },
};
