import { styled } from "@mui/material/styles";
import { PRIMARY_BACKGROUND, PRIMARY_COLOR, TEXT_SEC_COLOR, TEXT_THIRD_COLOR } from "./ColorTheme";
import { CSSObject } from "@mui/material/styles";

export enum HeaderStyle {
  PRIMARY_EXPAND = "primary-expand",
  SECONDARY_SHORT = "secondary-short",
}

export interface HeaderProps {
  styleMode: keyof typeof HeaderComponentStyles;
}


export const HeaderComponentStyles: Record<HeaderStyle, CSSObject> = {
  [HeaderStyle.PRIMARY_EXPAND]: {
    height: 198,
    backgroundColor: PRIMARY_COLOR,
    width: "100%",
    borderRadius: "0px 0px 16px 16px",
    boxShadow: "0px 3px 8px 0px rgba(34, 53, 62, 0.25)",
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 28,
    color: TEXT_SEC_COLOR,
    position: "fixed", 
    top: 0,
    zIndex: 1000,
  },
  [HeaderStyle.SECONDARY_SHORT]: {
    height: 124,
    backgroundColor: PRIMARY_BACKGROUND,
    width: "100%",
    borderRadius: "0px 0px 16px 16px",
    boxShadow: "0px 3px 8px 0px rgba(34, 53, 62, 0.25)",
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 28,
    color: TEXT_THIRD_COLOR,
    position: "fixed", 
    top: 0,
    zIndex: 1000,
  },
};


