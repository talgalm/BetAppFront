import { styled } from "@mui/material/styles";
import { TypographyTypes } from "../../Theme/Typography/typography";
import { PRIMARY_COLOR } from "../../Theme/ColorTheme";

export const PageContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  justifyContent: "space-between",
  textAlign: "right",
  gap: 16,
  paddingRight: 24,
  paddingLeft: 24,
  paddingTop: 36,
  height: "73vh",
  overflowY: "auto",
  overflowX: "hidden",
});

export const BetNameInput = styled("input")<{
  typography: typeof TypographyTypes.H2;
}>(({ typography }) => ({
  border: "none",
  width: "100%",
  outline: "none",
  direction: "rtl",
  backgroundColor: "transparent",
  color: typography.color,
  fontSize: typography.fontSize,
  fontFamily: "IBM Plex Sans Hebrew",
  fontWeight: typography.fontWeight,
  padding: "0",
  borderBottom: "1px solid transparent",
}));

export const StyledButton = styled("button")({
  width: 343,
  height: 48,
  border: 1.5,
  borderRadius: 12,
  backgroundColor: PRIMARY_COLOR,
  padding: 15,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
});
