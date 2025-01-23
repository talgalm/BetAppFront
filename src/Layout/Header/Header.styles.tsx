import { styled } from "@mui/material/styles";
import { PRIMARY_COLOR, TEXT_SEC_COLOR } from "../../Theme/ColorTheme";
import "@fontsource/ibm-plex-sans-hebrew";
import {
  HeaderComponentStyles,
  HeaderStyle,
} from "../../Theme/ThemeInterfaces";

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
  gap: 5,
});

export const PointText = styled("div")({
  display: "flex",
  marginTop: 25,
});

export const PointsContainer = styled("div")({
  display: "flex",
  alignItems: "baseline",
  flexDirection: "row-reverse",
  gap: 5,
  marginRight: 50,
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
