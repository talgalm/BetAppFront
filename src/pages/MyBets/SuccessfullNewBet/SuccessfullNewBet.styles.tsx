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
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
  color: "white",
  fontSize: "24px",
});
