import { styled } from '@mui/material/styles';
import { PRIMARY_COLOR } from '../../Theme/ColorTheme';

export const OverlayContainer = styled('div')({
  position: 'fixed',
  top: -1,
  left: 0,
  width: '100%',
  height: '101%',
  backgroundColor: PRIMARY_COLOR,
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  alignItems: 'center',
  zIndex: 1000,
  color: 'white',
  fontSize: '24px',
  overflowY: 'auto',
  paddingBottom: 25,
});

export const LogoDiv = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 16,
});

export const BetNameDiv = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  direction: 'rtl',
  width: '100%',
  justifyContent: 'flex-start',
  padding: 16,
  marginTop: 60,
});

export const ButtonsDiv = styled('div')({
  marginTop: 50,
  width: '75%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
