import { Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReactComponent as ArrowIcon } from '../../Theme/Icons/Bet/Arrow.svg';
import { ParticipantStatus } from '../../Interfaces';

export const MainContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  marginTop: 54,
  position: 'fixed',
  overflowY: 'hidden',
});

export const HeaderContainer = styled('div')({
  position: 'fixed',
  top: 54,
  padding: 16,
  gap: 8,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  width: '100%',
  zIndex: 2,
  textAlign: 'right',
  backgroundColor: '#ffffff',
  boxShadow: `
    0px 2px 5px 0px #CBC6E31A,
    0px 9px 9px 0px #CBC6E317,
    0px 21px 13px 0px #CBC6E30D,
    0px 38px 15px 0px #CBC6E303,
    0px 59px 17px 0px #CBC6E300
  `,
});

export const ContentContainer = styled('div')<{ state?: boolean; isOneButton?: boolean }>(
  ({ state, isOneButton }) => ({
    position: 'fixed',
    inset: `${180}px 0 ${150}px 0`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    overflowY: 'auto',
    // height: '100%',
  })
);

// small mobile -> in cmpleted   inset: `${180}px 0 ${150}px 0`,
// small mobile -> in cmpleted   inset: `${180}px 0 ${0}px 0`,

export const Row = styled('div')<{ isWinner?: boolean }>(({ isWinner }) => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'row-reverse',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 16,
  padding: '8px 16px 8px 16px',
  backgroundColor: isWinner ? '#A8D6CC' : 'transparent',
}));

export const Column = styled('div')<{ isOpen?: boolean }>(({ isOpen }) => ({
  display: 'flex',
  flexDirection: 'column',
  direction: 'rtl',
  gap: 5,
  // width: isOpen ? '100%' : 'auto',
  width: '100%',
}));

export const AvatarsOnlyView = styled('div')<{ isVisible: boolean }>(({ isVisible }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 5,
  opacity: isVisible ? 1 : 0,
  height: isVisible ? 'auto' : 0,
  overflow: 'hidden',
  transition: 'opacity 1s ease',
  position: isVisible ? 'relative' : 'absolute',
}));

export const DetailsListView = styled('div')<{ isVisible: boolean }>(({ isVisible }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 5,
  opacity: isVisible ? 1 : 0,
  height: isVisible ? 'auto' : 0,
  overflow: 'hidden',
  transition: 'opacity 1s ease',
  position: isVisible ? 'relative' : 'absolute',
  // backgroundColor: '#15AB94',
  // borderRadius: 8,
}));

export const AvatarRow = styled('div')({
  position: 'relative',
  width: '100%',
});

const statusToBorder: Record<ParticipantStatus, string> = {
  pending: '#EF9645',
  active: '#15AB94',
  canceled: '#DA3E3E',
  voted: '',
};

interface SmallAvatarProps {
  status?: ParticipantStatus;
}

export const SmallAvatar = styled(Avatar, {
  shouldForwardProp: (prop) => prop !== 'status',
})<SmallAvatarProps>(({ status }) => ({
  backgroundColor: 'grey',
  width: 24,
  height: 24,
  fontSize: 11,
  zIndex: 0,
  border: status
    ? statusToBorder[status] === 'none'
      ? 'none'
      : `2px solid ${statusToBorder[status] || 'grey'}`
    : '',
}));

export const ButtonsContainer = styled('div')({
  position: 'fixed',
  bottom: 10,
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

export const ButtonsContainerInner = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  gap: 10,
  alignItems: 'center',
  width: '100%',
});

export const RotatingArrow = styled(ArrowIcon)<{ open: boolean }>(({ open }) => ({
  transform: open ? 'rotate(-90deg)' : 'rotate(0deg)',
  transition: 'transform 0.2s ease',
  flexShrink: 0,
  alignSelf: 'flex-start',
  marginTop: 13,
}));

export const DisclaimerWrapper = styled('div')<{ isVisible: boolean }>(({ isVisible }) => ({
  maxHeight: isVisible ? '200px' : '0',
  opacity: isVisible ? 1 : 0,
  transition: 'opacity 0.5s ease, max-height 0.5s ease',
  overflow: 'hidden',
}));
