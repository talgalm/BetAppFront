import { styled } from '@mui/material/styles';
import { Divider } from '@mui/material';
import { ReactComponent as Facebook } from '../../Theme/Icons/AuthIcons/FacebookIcon.svg';
import { ReactComponent as Google } from '../../Theme/Icons/AuthIcons/GoogleIcon.svg';
import { ReactComponent as Apple } from '../../Theme/Icons/AuthIcons/AppleIcon.svg';

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
