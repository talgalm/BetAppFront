import { styled } from '@mui/material/styles';
import { PRIMARY_BACKGROUND } from '@theme/colorTheme';

export const PopUpOverlay = styled('div')<{ isOpen?: boolean }>(({ isOpen }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: '#B2B2B259',
  backdropFilter: 'blur(6px)',
  zIndex: 9999,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'opacity 0.3s ease',
  opacity: isOpen ? 1 : 0,
  visibility: isOpen ? 'visible' : 'hidden',
  pointerEvents: isOpen ? 'auto' : 'none',
  margin: 0,
  padding: 16,
  width: '100%',
}));

export const PopUpContainer = styled('div')({
  width: '100%',
  backgroundColor: `${PRIMARY_BACKGROUND}`,
  borderRadius: 16,
  padding: 16,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  textAlign: 'right',
});

export const PopUpContentContainer = styled('div')({
  borderBottom: '1px solid #c8c8e1',
});
