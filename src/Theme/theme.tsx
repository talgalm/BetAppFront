import { createTheme } from '@mui/material/styles';

export enum ThemeType {
  Primary = 'primary',
  Secondary = 'secondary',
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#15AB94',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFFFFF',
      contrastText: '#15AB94',
    },
    error: {
      main: '#D32F2F',
    },
    success: {
      main: '#4CAF50',
    },
    text: {
      primary: '#333333',
      secondary: '#777777',
    },
    action: {
      disabledBackground: '#A8D6CC',
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
      color: '#9798A2',
      fontFamily: 'Fredoka',
    },
    body2: {
      //TextSmall
      fontWeight: 500,
      fontSize: 8,
      color: '#ffffff',
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
