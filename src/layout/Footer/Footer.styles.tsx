// Footer.styles.ts
import { styled } from '@mui/material/styles';

// base styles (no transition yet)
export const Container = styled('div')(({ theme }) => ({
  position: 'fixed',
  left: 0,
  bottom: 10,
  width: '100%',
  maxWidth: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0',
  margin: '0',

  transform: 'translateY(110%)',
  opacity: 0,

  '&[data-visible="true"]': {
    transform: 'translateY(0)',
    opacity: 1,
    pointerEvents: 'auto',
  },

  pointerEvents: 'none',
}));
