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
    button: {
      fontSize: '1rem',
      fontWeight: 600,
      textTransform: 'none',
    },
  },
});

export default theme;
