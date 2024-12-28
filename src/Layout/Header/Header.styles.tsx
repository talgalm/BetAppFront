import { styled } from "@mui/material/styles";
import { PRIMARY_COLOR, TEXT_SEC_COLOR } from "../../Theme/ColorTheme";
import "@fontsource/ibm-plex-sans-hebrew"; 

export const HeaderComponent = styled("div")({
  width: "100%",
  height: 198,
  backgroundColor: PRIMARY_COLOR,
  borderRadius: "0px 0px 16px 16px",
  boxShadow: "0px 3px 8px 0px rgba(34, 53, 62, 0.25)",
  paddingRight: 16,
  paddingLeft: 16,
  paddingTop: 28,
});

export const LogoDiv = styled("div")({
  display: "flex",
  height: 24,
  justifyContent: "center",
  alignItems: "center",
});

export const TotalPointsDiv = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingTop: 12,
  color: TEXT_SEC_COLOR,
  gap: 10,
});

export const PointText = styled("div")({
  position: "absolute",
  marginRight: 150,
  marginTop: 25,
});

export const ButtonsDiv = styled("div")({
  paddingTop: 12,
  gap: 16,
  display: "flex",
  justifyContent: "center",
});
