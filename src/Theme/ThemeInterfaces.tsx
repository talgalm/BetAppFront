import { PRIMARY_BACKGROUND, PRIMARY_COLOR } from './ColorTheme';
import { CSSObject } from '@mui/material/styles';

export interface Layout {
  headerStyle: HeaderStyle;
  footerStyle: FooterStyle;
}

export enum HeaderStyle {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export enum FooterStyle {
  SHOW = 'show',
  HIDE = 'hide',
}

export const HeaderComponentStyles: Record<HeaderStyle, CSSObject> = {
  [HeaderStyle.PRIMARY]: {
    height: 56,
    backgroundColor: PRIMARY_BACKGROUND,
    position: 'fixed',
    top: -1,
    width: '100%',
    padding: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // zIndex: 10,
    boxShadow: `
      0px 2px 5px 0px #CBC6E31A,
      0px 9px 9px 0px #CBC6E317,
      0px 21px 13px 0px #CBC6E30D,
      0px 38px 15px 0px #CBC6E303,
      0px 59px 17px 0px #CBC6E300
    `,
  },
  [HeaderStyle.SECONDARY]: {
    height: 56,
    backgroundColor: PRIMARY_BACKGROUND,
    width: '100%',
    padding: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    boxShadow: '0px 2px 5px 0px #CBC6E31A',
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
