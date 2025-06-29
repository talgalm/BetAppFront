import { styled } from '@mui/material/styles';
import { PRIMARY_WHITE } from '@theme/colorTheme';

export const LoaderContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: PRIMARY_WHITE,
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',

  zIndex: 1000,
  color: 'white',
  fontSize: '24px',
});
