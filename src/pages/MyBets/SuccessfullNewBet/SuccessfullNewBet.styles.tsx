import styled from "@emotion/styled";
import { PRIMARY_COLOR } from "../../../Theme/ColorTheme";

export const OverlayContainer = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: PRIMARY_COLOR,
  display: "flex",
  justifyContent: "flex-start",
  flexDirection: "column",
  alignItems: "center",
  zIndex: 1000,
  color: "white",
  fontSize: "24px",
  overflowY: "auto",
  paddingBottom: 25,
});

export const LogoDiv = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 16,
});

export const IconsDiv = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 10,
  width: "70%",
  gap:16
});
export const IconsDivRisk = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 10,
  width: "95%",
  gap: 8,
});

export const BetNameDiv = styled("div")({
  display: "flex",
  flexDirection: "column",
  direction: "rtl",
  width: "100%",
  justifyContent: "flex-start",
  padding: 16,
  marginTop: 60,
});


export const LinkDiv = styled("div")({
  display: "flex",
  flexDirection: "column",
  direction: "rtl",
  width: "100%",
  justifyContent: "flex-start",
  padding: 16,
});

export const ParticipantsDiv = styled("div")({
  display: "flex",
  flexDirection: "column",
  direction: "rtl",
  width: "100%",
  justifyContent: "flex-start",
  padding: 16,
  gap: 10,
  marginTop: 20
});

export const CheckboxDiv = styled("div")({
  display: "flex",
  width: "100%",
  direction: "rtl",
  paddingRight: 8,
  marginTop: -10,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
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

export const ButtonsDiv = styled("div")({
  marginTop:50,
  width:"75%",
  display:"flex",
  justifyContent:"center",
  alignItems:"center"
});
