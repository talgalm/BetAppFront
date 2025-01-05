import { styled } from "@mui/material/styles";
import { TypographyTypes } from "../../../Theme/Typography/typography";

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

export const AddParticipantTag = styled("div")({
  display: "flex",
  flexDirection: "row",
  direction: "rtl",
  gap: 4,
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
