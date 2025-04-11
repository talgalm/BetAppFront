import { PRIMARY_BACKGROUND, PRIMARY_COLOR, TEXT_SEC_COLOR, TEXT_THIRD_COLOR } from './ColorTheme';
import { CSSObject } from '@mui/material/styles';

export interface Layout {
  headerStyle: HeaderStyle;
  footerStyle: FooterStyle;
}

export enum HeaderStyle {
  PRIMARY = 'primary',
}

export enum FooterStyle {
  SHOW = 'show',
  HIDE = 'hide',
}

export const HeaderComponentStyles: Record<HeaderStyle, CSSObject> = {
  [HeaderStyle.PRIMARY]: {
    height: 56,
    backgroundColor: PRIMARY_BACKGROUND,
    width: '100%',
    padding: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
};

export const FooterComponentStyles: Record<FooterStyle, CSSObject> = {
  [FooterStyle.SHOW]: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: PRIMARY_COLOR,
    boxShadow: '0px -3px 8px 0px rgba(34, 53, 62, 0.25)',
    padding: 16,
    marginTop: 'auto',
    position: 'fixed',
    bottom: -1,
    height: 50,
  },
  [FooterStyle.HIDE]: {
    display: 'none',
  },
};
