import { styled } from "@mui/material/styles";
import { PRIMARY_COLOR, TEXT_SEC_COLOR } from "../../Theme/ColorTheme";

export const FooterComponent = styled("div")({
  width: "100%", 
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: PRIMARY_COLOR,
  boxShadow: "0px -3px 8px 0px rgba(34, 53, 62, 0.25)",
  padding: "5px 16px", 
  marginTop: "auto",
  position: "fixed",
  bottom: 0,
});


export const ButtonDiv = styled("div")({
display: 'flex',
padding: 16,
justifyContent:  'space-around',
alignItems: 'center',
gap: 8,
flexShrink: 0,
});
