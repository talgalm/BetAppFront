import { Avatar, Fab } from '@mui/material';
import { styled } from '@mui/material/styles';

interface ItemsBodyContentProps {
  selected?: boolean;
}

export const PopUpOverlay = styled('div')<{ isOpen?: boolean }>(({ isOpen }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 12,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
  transition: 'opacity 0.3s ease',
  opacity: isOpen ? 1 : 0,
  visibility: isOpen ? 'visible' : 'hidden',
  pointerEvents: isOpen ? 'auto' : 'none',
  margin: 0,
  padding: 0,
  width: '100%',
}));

export const PopUpDiv = styled('div')<{ isOpen?: boolean; padding?: boolean }>(({ isOpen }) => ({
  position: 'relative',
  width: '100%',
  maxWidth: '100%',
  minWidth: '100%',
  height: '100vh',
  backgroundColor: 'White',
  borderBottom: 'none',
  zIndex: 999,
  transition: 'transform 0.3s ease',
  transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
  boxSizing: 'border-box',
  margin: 0,
  padding: '24px 16px 24px 16px',
  overflow: 'hidden',
  direction: 'rtl',
}));

export const PopUpHeader = styled('div')({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  zIndex: 5,
  marginTop: 50,
  marginBottom: 0,
});

export const PopUpHeader2 = styled('div')({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  zIndex: 99,
  marginTop: 40,
  marginBottom: 20,
});

export const PopUpScroll = styled('div')({
  overflowY: 'scroll',
  paddingRight: 3,
  height: '100%',
  minHeight: '100px',
  direction: 'ltr',
  flexGrow: 1,
  paddingBottom: 100,
});

export const CloseIcon = styled('span')({
  position: 'absolute',
});

export const PopUpNotInContact = styled('div')({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: 8,
  marginTop: 20,
  marginBottom: 5,
});

export const ItemsContant = styled('div')({
  position: 'sticky',
  top: 0,
  zIndex: 1,
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

export const ItemsHeaderContent = styled('div')({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  paddingBottom: 8,
  paddingTop: 8,
});

export const ItemsBodyContent = styled('div')<ItemsBodyContentProps>(({ selected }) => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'row-reverse',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 4,
  borderRadius: 6,
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  backgroundColor: selected ? 'lightblue' : 'transparent',
  '&:last-child': {
    paddingBottom: 12,
  },
}));

export const ItemsNameImageCircleContent = styled('div')({
  display: 'flex',
  flexDirection: 'row-reverse',
  alignItems: 'center',
  gap: 12,
  paddingRight: 4,
});

export const SmallAvatar = styled(Avatar)({
  backgroundColor: 'grey',
  width: 24,
  height: 24,
  fontSize: 11,
});

export const CornerFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  left: theme.spacing(2),
  zIndex: 1300,
  [theme.breakpoints.up('sm')]: {
    left: 'auto',
    right: theme.spacing(2),
  },
}));
