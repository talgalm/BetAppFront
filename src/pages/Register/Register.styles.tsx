import { styled } from "@mui/material/styles";
import {
  PRIMARY_BACKGROUND,
  TEXT_SEC_COLOR,
  TEXT_COLOR,
  MAIN_FONT,
} from "../../Theme/ColorTheme";

export const StyledContainer = styled("div")({
  display: "flex",
  backgroundColor: PRIMARY_BACKGROUND,
  height: "100%",
  width: "100%",
  flexDirection: "column",
});

export const PageContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "0 16px",
  margin: "0 auto",
  maxWidth: "480px",
  minHeight: "100vh",
});

export const HeadlineContainer = styled("div")({
  paddingTop: 75,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

export const HeadlineTitle = styled("div")({
  fontFamily: MAIN_FONT,
  fontWeight: 700,
  fontSize: "2.5rem",
  color: TEXT_SEC_COLOR,
  textAlign: "center",
  margin: "20px 0",
  letterSpacing: "1.5px",
  lineHeight: "1.3",
  textTransform: "uppercase",
  textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  transition: "color 0.3s ease",
  "@media (max-width: 768px)": {
    fontSize: "1.8rem",
  },
});
export const HeadlineSubTitle = styled("div")({
  fontFamily: MAIN_FONT,
  fontWeight: 500,
  fontSize: "1.25rem",
  color: TEXT_COLOR,
  textAlign: "center",
  margin: "10px 0",
  letterSpacing: "1px",
  lineHeight: "1.5",
  textTransform: "none",
  textShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
  transition: "color 0.3s ease, font-size 0.3s ease",
  "@media (max-width: 768px)": {
    fontSize: "1rem",
  },
});

export const SubText = styled("div")({
  fontFamily: MAIN_FONT,
  fontWeight: 500,
  fontSize: "1.25rem",
  color: TEXT_COLOR,
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

export const FormContainer = styled("div")({
  paddingTop: 75,
  width: "90%",
});
