import { styled } from '@mui/material';

export const ButtonsFixedContainer = styled('div')({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  flexDirection: 'column',
  gap: 15,
  padding: 16,
  zIndex: 10,
});

export const ButtonsContainer = styled('div')({
  width: '100%',
  paddingBottom: 12,
  gap: 12,
  display: 'flex',
  flexDirection: 'column',
});

export const ButtonsHubContainer = styled('div')<{
  isFixed: boolean;
}>(({ isFixed }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: isFixed ? 15 : 12,
  padding: isFixed ? 16 : 0,
  paddingBottom: isFixed ? 0 : 12,
  position: isFixed ? 'fixed' : 'relative',
  bottom: isFixed ? 0 : 'auto',
  left: isFixed ? 0 : 'auto',
  right: isFixed ? 0 : 'auto',
  justifyContent: isFixed ? 'space-between' : 'flex-start',
  alignItems: isFixed ? 'center' : 'stretch',
  zIndex: isFixed ? 10 : 'auto',
}));
