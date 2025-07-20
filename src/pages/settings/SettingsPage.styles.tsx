import { styled } from '@mui/material/styles';
import { CLOSE_ACCOUNT_RED, TAG_PURPLE } from '@theme/colorTheme';

export const HomeDivContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  direction: 'rtl',
  justifyContent: 'center',
  padding: 16,
  width: '100%',
  gap: 16,
  marginTop: 60,
});

export const NotificationContainer = styled('div')({
  display: 'flex',
  width: '100%',
  padding: 8,
  paddingRight: 16,
  paddingLeft: 16,
  borderRadius: 8,
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: TAG_PURPLE,
});

export const CloseAccountContainer = styled('div')({
  display: 'flex',
  width: '100%',
  padding: 8,
  paddingRight: 16,
  paddingLeft: 16,
  borderRadius: 8,
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: CLOSE_ACCOUNT_RED,
});
