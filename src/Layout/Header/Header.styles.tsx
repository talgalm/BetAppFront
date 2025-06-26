import { styled } from '@mui/material/styles';
import '@fontsource/ibm-plex-sans-hebrew';
import { HeaderComponentStyles, HeaderStyle } from '../../theme/layoutStyles';

interface HeaderProps {
  headerStyle?: HeaderStyle;
}

export const HeaderComponent = styled('div')<HeaderProps>(({ headerStyle }) => ({
  ...HeaderComponentStyles[headerStyle || HeaderStyle.PRIMARY],
}));

export const HeaderInnerContainer = styled('div')<{ isOffset?: boolean }>(({ isOffset }) => ({
  width: '100%',
  position: 'relative',
  top: isOffset ? 20 : 0,
  transition: 'top 0.3s ease',
  padding: 16,
}));

export const LogoDiv = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const RightIconDiv = styled('div')({
  position: 'absolute',
  right: 10,
});

export const LeftIconDiv = styled('div')({
  position: 'absolute',
  left: 16,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '4px 8px 4px 8px',
  gap: 4,
  borderRadius: 4,
  backgroundColor: '#EFF6FF',
});

export const LeftIconNoBack = styled('div')({
  position: 'absolute',
  left: 6,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '4px 8px 4px 8px',
  gap: 4,
  borderRadius: 4,
});
export const BetimIconDiv = styled('div')({});

export const VerificationContainer = styled('div')({
  position: 'absolute',
  marginTop: 56,
  backgroundColor: '#DA3E3E4D',
  padding: '8px 16px 8px 16px',
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%',
  gap: 8,
  zIndex: 999,
});
