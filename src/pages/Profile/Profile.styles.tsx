import { styled } from '@mui/material/styles';
import { Avatar } from '@mui/material';
import { PRIMARY_WHITE } from '@theme/colorTheme';

export const HomeDivContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 16,
  gap: 10,
  marginBottom: 60,
});

export const ProfileHeaderContainer = styled('div')({
  display: 'flex',
  marginTop: 75,
  width: '100%',
  padding: 16,
  direction: 'rtl',
  alignItems: 'center',
  gap: 32,
});

export const ProfileHeaderTextContainer = styled('div')({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  width: '100%',
  flexDirection: 'column',
  gap: 6,
});

export const ProfileImageWrapper = styled('div')({
  width: 62,
  height: 62,
  marginLeft: 'auto',
});

export const ProfileImage = styled(Avatar)<{ enter?: boolean }>(({ enter }) => ({
  width: 62,
  height: 62,
  border: `4px solid ${PRIMARY_WHITE}`,
  zIndex: 12,
  position: 'fixed',
  opacity: enter ? 1 : 0,
  transition: 'opacity 0.5s ease',
  objectFit: 'cover',
}));

export const InnerLoader = styled('div')({
  transform: 'translate(-50%, -50%)',
  width: 28,
  height: 28,
  border: '3px solid black',
  borderTop: '3px solid transparent',
  borderRadius: '50%',
  animation: 'spin 0.8s linear infinite',
  zIndex: 16,
  backgroundColor: 'transparent',
});

export const StatsContainer = styled('div')({
  display: 'flex',
  marginTop: 40,
  justifyContent: 'space-between',
  direction: 'rtl',
  borderRadius: 16,
  padding: 16,
  gap: 16,
  width: '100%',
  backgroundColor: PRIMARY_WHITE,
  boxShadow: `
    0px 2px 5px 0px #CBC6E31A,
    0px 9px 9px 0px #CBC6E317,
    0px 21px 13px 0px #CBC6E30D,
    0px 38px 15px 0px #CBC6E303,
    0px 59px 17px 0px #CBC6E300,
    0px -4px 8px 0px #0000000A
  `,
});

export const Column = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyItems: 'center',
});
