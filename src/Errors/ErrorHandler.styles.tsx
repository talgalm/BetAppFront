import { styled } from '@mui/material/styles';

export const PopUpOverlay = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 9999,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'opacity 0.3s ease',
  opacity: 1,
  visibility: 'visible',
  pointerEvents: 'auto',
  margin: 0,
  padding: 0,
  gap: 12,
  width: '100%',
});

export const PopUpDiv = styled('div')({
  width: 343,
  height: 520,
  gap: 12,
  borderRadius: 16,
  paddingTop: 16,
  paddingRight: 16,
  paddingLeft: 16,
  backgroundColor: 'white',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
});

export const PopUpHeader = styled('div')({
  display: 'flex',
  width: '100%',
  direction: 'rtl',
  justifyContent: 'space-between',
  zIndex: 1000,
});

export const PopUpContent = styled('div')({
  gap: 12,
  display: 'flex',
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  alignSelf: 'stretch',
  padding: 4,
  direction: 'rtl',
});

export const ButtonsContainer = styled('div')({
  width: '100%',
  paddingBottom: 12,
});
