// Footer.styles.ts
import { styled } from '@mui/material/styles';

// base styles (no transition yet)
export const Container = styled('div')(({ theme }) => ({
  position: 'fixed',
  left: 0,
  bottom: 10,
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0 16px',

  transition: 'transform 300ms ease-in-out, opacity 300ms ease-in-out',
  transform: 'translateY(110%)',
  opacity: 0,

  '&[data-visible="true"]': {
    transform: 'translateY(0)',
    opacity: 1,
    pointerEvents: 'auto',
  },

  pointerEvents: 'none',
}));
