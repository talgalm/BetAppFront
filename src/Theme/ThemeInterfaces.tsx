import { styled } from "@mui/material/styles";
import {
  PRIMARY_BACKGROUND,
  PRIMARY_COLOR,
  TEXT_SEC_COLOR,
  TEXT_THIRD_COLOR,
} from "./ColorTheme";
import { CSSObject } from "@mui/material/styles";

export interface Layout {
  headerStyle: HeaderStyle;
  footerStyle: FooterStyle;
}

export enum HeaderStyle {
  PRIMARY_EXPAND = "primary-expand",
  SECONDARY_SHORT = "secondary-short",
}

export enum FooterStyle {
  SHOW = "show",
  HIDE = "hide",
}

export const HeaderComponentStyles: Record<HeaderStyle, CSSObject> = {
  [HeaderStyle.PRIMARY_EXPAND]: {
    height: 198,
    backgroundColor: PRIMARY_COLOR,
    width: "100%",
    boxShadow: "0px 3px 8px 0px rgba(34, 53, 62, 0.25)",
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 28,
    color: TEXT_SEC_COLOR,
    position: "fixed",
    top: -1,
    zIndex: 1000,
  },
  [HeaderStyle.SECONDARY_SHORT]: {
    height: 124,
    backgroundColor: PRIMARY_BACKGROUND,
    width: "100%",
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

export const FooterComponentStyles: Record<FooterStyle, CSSObject> = {
  [FooterStyle.SHOW]: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: PRIMARY_COLOR,
    boxShadow: "0px -3px 8px 0px rgba(34, 53, 62, 0.25)",
    padding: "5px 16px",
    marginTop: "auto",
    position: "fixed",
    bottom: -1,
  },
  [FooterStyle.HIDE]: {
    display: "none",
  },
};
