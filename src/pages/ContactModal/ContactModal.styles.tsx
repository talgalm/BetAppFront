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
  zIndex: 9999,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
  transition: 'opacity 0.3s ease',
  opacity: isOpen ? 1 : 0,
  visibility: isOpen ? 'visible' : 'hidden',
  pointerEvents: isOpen ? 'auto' : 'none',
  margin: 0,
  padding: 0,
}));

export const PopUpDiv = styled('div')<{ isOpen?: boolean }>(({ isOpen }) => ({
  position: 'relative',
  width: '100%',
  maxWidth: '100%',
  minWidth: '100%',
  height: '93vh',
  backgroundColor: '#F8F8FD',
  borderRadius: '24px 25px 0 0',
  border: '1.5px solid #7F8CB9',
  borderLeft: 'none',
  borderRight: 'none',
  borderBottom: 'none',
  zIndex: 10000,
  transition: 'transform 0.3s ease',
  transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
  boxSizing: 'border-box',
  margin: 0,
  paddingTop: '123px',
  overflow: 'hidden',
}));

export const PopUpHeader = styled('div')({
  height: 123,
  background: '#22353E',
  borderRadius: '24px 25px 0 0',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  padding: '20px 20px 0',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  zIndex: 10001,
});

export const PopUpScroll = styled('div')({
  overflowY: 'auto',
  paddingBottom: '20px',
  height: '80vh',
  maxHeight: 700,
});

export const CloseIcon = styled('span')({
  position: 'absolute',
});

export const PopUpNotInContact = styled('div')({
  backgroundColor: '#EDEDF5',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: 16,
  gap: 8,
});

export const ItemsContant = styled('div')({
  position: 'sticky',
  top: 0,
  zIndex: 1,
  backgroundColor: 'white',
});

export const ItemsHeaderContent = styled('div')({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  paddingRight: 16,
  paddingBottom: 8,
  paddingTop: 8,
  backgroundColor: '#EDEDF5',
});

export const ItemsBodyContent = styled('div')<ItemsBodyContentProps>(({ selected }) => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: 12,
  paddingBottom: 8,
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  backgroundColor: selected ? 'lightblue' : 'transparent',
  '&:last-child': {
    paddingBottom: 12,
  },
}));

export const ItemsNameImageContent = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
});

export const ItemsNameImageCircleContent = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 12,
  paddingRight: 4,
});

export const AvatarsDiv = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  width: 24,
  height: 24,
  flexShrink: 0,
  borderRadius: 8,
  border: '1.5px solid var(--Background-Lavender-Mist, #EDEDF5)',
  background: 'var(--Status-Wild-Blue-Yonder, #7F8CB9)',
});
