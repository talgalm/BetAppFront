import { styled } from "@mui/material/styles";
import { TypographyTypes } from "../../Theme/Typography/typography";


export const PageContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  justifyContent: "center",
  textAlign: "right",
  gap: 16,
  paddingRight: 24,
  paddingLeft: 24,
  paddingTop: 36,
});

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

export const NumOfChars = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  paddingLeft: 16,
  marginTop: -24,
});
export const AddParticipantsDiv = styled("div")({
  display: "flex",
  flexDirection: "row",
  direction: "rtl",
  flexWrap: "wrap",
  gap: 8,
  width: "100%",
  maxWidth: "100%",
  alignItems: "center",
  justifyContent: "flex-start",
  paddingTop: 8,
  boxSizing: "border-box",
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

export const AddParticipantTag = styled("div")({
  display: "flex",
  flexDirection: "row",
  direction: "rtl",
  gap : 4
});

export const ParticipantTag = styled("div")({
  display: "flex",
  flexDirection: "row",
  direction: "rtl",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 10,
  gap: 10,
  width: 121,
  height: 44,
  borderRadius: "8px",
  border: "1.5px solid black",
  opacity: 1,
});










