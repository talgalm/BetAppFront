import { styled } from '@mui/material/styles';

export const MainContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 54,
});

export const ButtonsContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  margin: 50,
  width: '100%',
  height: 152,
  padding: 16,
  gap: 16,
});

export const TextConatiner = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  textAlign: 'center',
  direction: 'rtl',
  padding: 16,
  gap: 12,
});
