import { styled } from "@mui/material/styles";
import { PRIMARY_COLOR, TEXT_SEC_COLOR } from "../../Theme/ColorTheme";
import "@fontsource/ibm-plex-sans-hebrew"; 
import { HeaderComponentStyles, HeaderStyle } from "../../Theme/ThemeInterfaces";

interface HeaderProps {
  headerStyle?: HeaderStyle;
}

export const HeaderComponent = styled("div")<HeaderProps>(
  ({ headerStyle }) => ({
    ...HeaderComponentStyles[headerStyle || HeaderStyle.PRIMARY_EXPAND], 
  })
);

export const LogoDiv = styled("div")({
  display: "flex",
  height: 24,
  justifyContent: "center",
  alignItems: "center",
  marginTop: -5,
});

export const TotalPointsDiv = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingTop: 6,
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

export const BackArrowDiv = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  position: "absolute", 
  right: 16,
  top: 85,
});
