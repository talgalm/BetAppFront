import { styled } from "@mui/material/styles";

interface StyledButtonProps {
  bgColor?: string;
  textColor?: string;
}

export const StyledButton = styled("button")<StyledButtonProps>(
  ({ bgColor, textColor }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 103,
    height: 48,
    padding: 16,
    gap: 8,
    borderRadius: 12,
    borderColor: "#EDEDF533",
    backgroundColor: bgColor,
    boxShadow: "0px 3px 8px 0px #EDEDF533",
    color: textColor,
  })
);
