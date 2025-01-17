import { styled } from "@mui/material/styles";

export const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  width:'100%'
});

export const IconsDivRisk = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 10,
  width: "95%",
  gap: 8,
});
export const ParticipantsDiv = styled("div")({
  display: "flex",
  flexDirection: "column",
  direction: "rtl",
  width: "100%",
  justifyContent: "flex-start",
  padding: 16,
  gap: 10,
  marginTop: 20,
});

export const RiskIcon = styled("div")({
  width: 60,
  height: 60,
  padding: 8,
  border: "1.5px solid #FFFFFF",
  borderRadius: 8,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
