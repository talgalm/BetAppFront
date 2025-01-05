import { styled } from "@mui/material/styles";
import { TypographyTypes } from "../../../Theme/Typography/typography";

export const BetInput = styled("input")<{
  typography: typeof TypographyTypes.H5;
}>(({ typography }) => ({
  width: "100%",
  direction: "rtl",
  marginTop: 16,
  border: "1.5px solid #9798A2",
  borderRadius: 8,
  fontSize: typography.fontSize,
  fontFamily: "IBM Plex Sans Hebrew",
  fontWeight: typography.fontWeight,
  outline: "none",
  color: typography.color,
  padding: "16px 16px 96px",
  "&::placeholder": {
    color: "#BDBDBD",
  },
}));
export const NumOfChars = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  paddingLeft: 16,
  marginTop: -24,
});
