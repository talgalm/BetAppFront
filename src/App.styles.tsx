import { styled } from "@mui/material/styles";
import { MAIN_FONT, PRIMARY_BACKGROUND } from "./Theme/ColorTheme";

export const PrimaryBackground = styled("div")({
  display: "flex",
  backgroundColor: PRIMARY_BACKGROUND,
  fontFamily: MAIN_FONT,
  height: "100vh", 
  width: "100%",
  flexDirection: "column",
});


