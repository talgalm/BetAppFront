import { styled } from '@mui/material/styles';
import { Avatar } from '@mui/material';

export const HomeDivContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 16,
  gap: 10,
  marginBottom: 60,
});

export const ProfileImageWrapper = styled('div')({
  position: 'relative',
  width: 100,
  height: 100,
  margin: '100px auto 0',
});

export const ProfileImage = styled(Avatar)<{ enter?: boolean }>(({ enter }) => ({
  width: 100,
  height: 100,
  border: '4px solid #FFFFFF',
  zIndex: 12,
  position: 'fixed',
  opacity: enter ? 1 : 0,
  transition: 'opacity 0.5s ease',
  objectFit: 'cover',
}));

export const InnerLoader = styled('div')({
  position: 'absolute',
  top: '50%',
  left: '50%',
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
  width: '50%',
  marginTop: 40,
  justifyContent: 'space-between',
  direction: 'rtl',
  position: 'fixed',
});

export const Column = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyItems: 'center',
});
