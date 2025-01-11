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
  paddingTop: 150,
  height: "98vh",
  overflowY: "auto",
  overflowX: "hidden",
  "&::-webkit-scrollbar": {
    display: "none",
  },
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
  width: "100%",
  height: 48,
  padding: 15,
  border: 1.5,
  borderRadius: 12,
  backgroundColor: PRIMARY_COLOR,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  marginBottom: 20
});
