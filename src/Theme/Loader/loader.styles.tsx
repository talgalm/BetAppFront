import { styled } from '@mui/material/styles';

export const LoaderContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#f9f9f9',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',

  zIndex: 1000,
  color: 'white',
  fontSize: '24px',
});
