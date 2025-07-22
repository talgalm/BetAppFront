import { PRIMARY_WHITE, PRIMARY_GREEN } from './colorTheme';
import { CSSObject } from '@mui/material/styles';

export interface Layout {
  headerStyle: HeaderStyle;
}

export enum HeaderStyle {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  PROFILE = 'profile',
}

const baseHeaderStyle: CSSObject = {
  position: 'fixed',
  top: -1,
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  transition: 'height 0.3s ease, background-color 0.3s ease',
  boxShadow: `
    0px 2px 5px 0px #CBC6E31A,
    0px 9px 9px 0px #CBC6E317,
    0px 21px 13px 0px #CBC6E30D,
    0px 38px 15px 0px #CBC6E303,
    0px 59px 17px 0px #CBC6E300
  `,
};

export const HeaderComponentStyles: Record<HeaderStyle, CSSObject> = {
  [HeaderStyle.PRIMARY]: {
    ...baseHeaderStyle,
    height: 56,
    backgroundColor: PRIMARY_WHITE,
    zIndex: 1,
  },
  [HeaderStyle.SECONDARY]: {
    ...baseHeaderStyle,
    height: 56,
    backgroundColor: PRIMARY_WHITE,
    zIndex: 0,
  },
  [HeaderStyle.PROFILE]: {
    ...baseHeaderStyle,
    height: 150,
    backgroundColor: PRIMARY_GREEN,
    zIndex: 1,
  },
};
