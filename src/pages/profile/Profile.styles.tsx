import { styled } from '@mui/material/styles';
import { Avatar, Divider } from '@mui/material';
import { DIVIDER_GREY, PRIMARY_WHITE } from '@theme/colorTheme';

export const HomeDivContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 16,
  width: '100%',
  gap: 10,
  marginBottom: 60,
});

export const ProfileHeaderContainer = styled('div')({
  display: 'flex',
  marginTop: 36,
  width: '100%',
  padding: 16,
  direction: 'rtl',
  alignItems: 'center',
  gap: 16,
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
  width: 68,
  height: 68,
  marginLeft: 'auto',
  position: 'relative',
});

export const ProfileImage = styled(Avatar)<{ enter?: boolean }>(({ enter }) => ({
  width: 68,
  height: 68,
  border: `4px solid ${PRIMARY_WHITE}`,
  zIndex: 0,
  position: 'relative',
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
  justifyContent: 'space-between',
  flexDirection: 'column',
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

export const Row = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-around',
});

export const ActionRow = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  alignItems: 'center',
  padding: 8,
  justifyContent: 'space-between',
});

export const Column = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyItems: 'center',
  gap: 4,
});

export const ActionsContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  marginTop: 30,
  gap: 4,
});

export const StyledDivider = styled(Divider)({
  width: '100%',
  borderBottomWidth: 1,
  borderColor: DIVIDER_GREY,
});

export const RowFixed = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 12,
});

export const EditIconWrapper = styled('div')({
  position: 'absolute',
  top: 46,
  left: 22,
  width: 23,
  height: 14,
  backgroundColor: '#FFFFFF29',
  backdropFilter: 'blur(4px)',
  borderRadius: 9,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  opacity: 1,
  cursor: 'pointer',
  zIndex: 20,
});
