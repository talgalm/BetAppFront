import { createTheme } from '@mui/material/styles';
import {
  ERROR_COLOR,
  PRIMARY_WHITE,
  PRIMARY_GREEN,
  PRIMARY_GREY,
  SECONDARY_GREEN,
} from './colorTheme';

export enum ThemeType {
  Primary = 'primary',
  Secondary = 'secondary',
}

const theme = createTheme({
  palette: {
    primary: {
      main: PRIMARY_GREEN,
      contrastText: PRIMARY_WHITE,
    },
    secondary: {
      main: PRIMARY_WHITE,
      contrastText: PRIMARY_GREEN,
    },
    error: {
      main: ERROR_COLOR,
    },
    // success: {
    //   main: '#4CAF50',
    // },
    // text: {
    //   primary: '#333333',
    //   secondary: '#777777',
    // },
    action: {
      disabledBackground: SECONDARY_GREEN,
    },
  },
  typography: {
    h1: {
      fontWeight: 500,
      fontSize: 28,
      fontFamily: 'Fredoka',
    },
    h2: {
      fontWeight: 400,
      fontSize: 20,
      fontFamily: 'Fredoka',
    },
    h3: {
      fontWeight: 500,
      fontSize: 18,
      fontFamily: 'Fredoka',
    },
    subtitle1: {
      //TextBig
      fontWeight: 400,
      fontSize: 18,
      fontFamily: 'Fredoka',
    },
    subtitle2: {
      //TextBig
      fontWeight: 400,
      fontSize: 16,
      fontFamily: 'Fredoka',
    },
    body1: {
      //TextSmall
      fontWeight: 500,
      fontSize: 14,
      color: PRIMARY_GREY,
      fontFamily: 'Fredoka',
    },
    body2: {
      //TextSmall
      fontWeight: 500,
      fontSize: 9,
      color: PRIMARY_WHITE,
      fontFamily: 'Fredoka',
    },
    button: {
      fontWeight: 600,
      fontSize: 18,
      fontFamily: 'Fredoka',
    },
  },
});

export default theme;
