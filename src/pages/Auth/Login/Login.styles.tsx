import { styled } from '@mui/material/styles';
import { ReactComponent as Apple } from '@assets/icons/authIcons/AppleIcon.svg';
import { DIVIDER_GREY } from '@theme/colorTheme';

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

export const AppleIcon = styled(Apple)({
  backgroundColor: 'white',
  width: '100%',
  height: 56,
  borderRadius: 8,
  padding: 15,
  border: `1px solid ${DIVIDER_GREY}`,
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
