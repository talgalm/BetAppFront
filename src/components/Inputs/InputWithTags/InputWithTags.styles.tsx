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

export const TagContainer = styled("div")({
  position: "relative",
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
  width: 150,
  height: 44,
  borderRadius: "8px",
  border: "1.5px solid #7F8CB9",
  opacity: 1,
  cursor: "pointer",
});

export const PopUpDiv = styled("div")({
  position: "absolute",
  top: "100%",
  right: 0,
  marginTop: 4,
  width: 125,
  height: 34,
  padding: 7,
  gap: 4,
  borderRadius: "8px",
  border: "1.5px solid #7F8CB9",
  opacity: 1,
  backgroundColor: "#F8F8FD",
  zIndex: 1000,
});

export const PopUpRow = styled("div")({
  display: "flex",
  flexDirection: "row",
  direction: "rtl",
  justifyContent: "space-between",
  paddingBottom: 4
});