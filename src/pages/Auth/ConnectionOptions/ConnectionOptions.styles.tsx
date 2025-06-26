import { styled } from '@mui/material/styles';
import { Divider } from '@mui/material';
import { ReactComponent as Facebook } from '@theme/icons/authIcons/FacebookIcon.svg';
import { ReactComponent as Google } from '@theme/icons/authIcons/GoogleIcon.svg';
import { ReactComponent as Apple } from '@theme/icons/authIcons/AppleIcon.svg';

export const HeaderContainer = styled('div')({
  width: '100%',
  padding: 16,
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  textAlign: 'start',
  direction: 'rtl',
});

export const SignInContainer = styled('div')({
  width: '100%',
  padding: 16,
  display: 'flex',
  direction: 'rtl',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  gap: 11,
});

export const BottomContainer = styled('div')({
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 'auto',
  position: 'fixed',
  bottom: -1,
});

export const ConnectionOptionsContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: 16,
  gap: 24,
});

export const DividerWithText = styled(Divider)({
  width: '100%',
});

export const ConnectionOptions = styled('div')({
  width: '100%',
  gap: 8,
  display: 'flex',
  flexDirection: 'row',
});

export const ConnectionOptionsTab = styled('div')({
  width: '100%',
  gap: 8,
  display: 'flex',
  flexDirection: 'row',
});

export const FacebookIcon = styled(Facebook)({
  backgroundColor: 'white',
  width: '100%',
  height: 56,
  borderRadius: 8,
  padding: 15,
  border: '1px solid #DADADA',
});

export const GoogleIcon = styled(Google)({
  backgroundColor: 'white',
  width: '100%',
  height: 56,
  borderRadius: 8,
  padding: 15,
  border: '1px solid #DADADA',
});

export const AppleIcon = styled(Apple)({
  backgroundColor: 'white',
  width: '100%',
  height: 56,
  borderRadius: 8,
  padding: 15,
  border: '1px solid #DADADA',
});

export const DontHaveAccountContainer = styled('div')({
  display: 'flex',
  direction: 'rtl',
  flexDirection: 'row',
  justifyContent: 'center',
  alignContent: 'center',
  width: '100%',
  padding: 16,
  gap: 3,
});
