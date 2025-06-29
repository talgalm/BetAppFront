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
