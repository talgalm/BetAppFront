import { styled } from "@mui/material/styles";
import { PRIMARY_COLOR, TEXT_SEC_COLOR } from "../../Theme/ColorTheme";
import { FooterComponentStyles, FooterStyle } from "../../Theme/ThemeInterfaces";

interface FooterProps {
  footerStyle?: FooterStyle;
}

export const FooterComponent = styled("div")<FooterProps>(({ footerStyle }) => ({
  ...FooterComponentStyles[footerStyle || FooterStyle.SHOW],
}));



export const ButtonDiv = styled("div")({
display: 'flex',
padding: 16,
justifyContent:  'space-around',
alignItems: 'center',
gap: 8,
flexShrink: 0,
});
