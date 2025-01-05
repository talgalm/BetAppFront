import { styled } from "@mui/material/styles";
import { TypographyTypes } from "../../Theme/Typography/typography";

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

export const InputDiv = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 8,
});

export const InputHeadline = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  textAlign: "right",
  gap: 8,
  paddingTop: 24,
  direction: "rtl",
  paddingBottom: 5,
  borderBottom: "1px solid #9798A2",
});

export const AddConditionsDiv = styled("div")({
  display: "flex",
  flexDirection: "column",
  direction: "rtl",
  flexWrap: "wrap",
  gap: 8,
  width: "100%",
  maxWidth: "100%",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  paddingTop: 8,
  boxSizing: "border-box",
});
