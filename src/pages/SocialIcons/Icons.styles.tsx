import { styled } from "@mui/material/styles";
import { MAIN_FONT, TEXT_SEC_COLOR } from "../../Theme/ColorTheme";

export const LoginWithSocialDiv = styled("div")({
  fontFamily: MAIN_FONT,
  fontWeight: 500,
  fontSize: "1.25rem",
  color: TEXT_SEC_COLOR,
  textAlign: "center",
  margin: "10px 0",
  letterSpacing: "1px",
  lineHeight: "1.5",
  textTransform: "none",
  textShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
  transition: "color 0.3s ease, font-size 0.3s ease",
  paddingTop: 25,
  "@media (max-width: 768px)": {
    fontSize: "1rem",
  },
});

export const IconsDiv = styled("div")({
  paddingTop: 20,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
  padding: "20px",
  backgroundColor: "#f9f9f9",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  width: "fit-content",
  margin: "auto",
});

export const IconStyle = styled("a")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "25px",
  height: "25px",
  borderRadius: "50%",
  color: "#fff",
  textDecoration: "none",
  "&:hover": {
    transform: "scale(1.1)",
    transition: "transform 0.3s ease",
  },
});
