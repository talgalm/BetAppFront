import { styled } from '@mui/material';

export const ButtonsHubContainer = styled('div')<{
  isFixed: boolean;
  isRow: boolean;
}>(({ isFixed, isRow }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: isRow ? 'row' : 'column',
  gap: 12, ///////// 15?
  padding: isFixed ? 16 : 0,
  paddingBottom: isFixed ? 0 : 12,
  position: isFixed ? 'fixed' : 'relative',
  bottom: isFixed ? 10 : 'auto', ///////// 0?
  left: isFixed ? 0 : 'auto',
  right: isFixed ? 0 : 'auto',
  justifyContent: isFixed ? 'space-between' : 'flex-start',
  alignItems: isFixed ? 'center' : 'stretch',
  zIndex: isFixed ? 10 : 'auto',
}));
