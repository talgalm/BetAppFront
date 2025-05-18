import { Avatar, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

export const MainContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  marginTop: 54,
  marginBottom: 25,
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
  backgroundColor: '#ffffff',
  boxShadow: `
    0px 2px 5px 0px #CBC6E31A,
    0px 9px 9px 0px #CBC6E317,
    0px 21px 13px 0px #CBC6E30D,
    0px 38px 15px 0px #CBC6E303,
    0px 59px 17px 0px #CBC6E300
  `,
});

export const ContentContainer = styled('div')({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  marginTop: 125,
});

export const Row = styled('div')({
  display: 'flex',
  width: '100%',
  flexDirection: 'row-reverse',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 16,
  padding: '8px 16px 8px 16px',
});

export const Column = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  direction: 'rtl',
  gap: 5,
});

export const AvatarRow = styled('div')({
  display: 'flex',
  flexDirection: 'row-reverse',
  gap: 4,
  justifyContent: 'flex-end',
});

type Status = 'pending' | 'active' | 'canceled';

const statusToBorder: Record<Status, string> = {
  pending: 'orange',
  active: 'green',
  canceled: 'red',
};

interface SmallAvatarProps {
  status?: Status;
}

export const SmallAvatar = styled(Avatar, {
  shouldForwardProp: (prop) => prop !== 'status',
})<SmallAvatarProps>(({ status }) => ({
  backgroundColor: 'grey',
  width: 24,
  height: 24,
  fontSize: 11,
  zIndex: 0,
  // 2) If somehow status is undefined, default to NONE:
  border: status
    ? statusToBorder[status] === 'none'
      ? 'none'
      : `2px solid ${statusToBorder[status] || 'grey'}`
    : '',
}));
