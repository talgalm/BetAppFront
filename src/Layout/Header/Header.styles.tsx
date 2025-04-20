import { styled } from '@mui/material/styles';
import '@fontsource/ibm-plex-sans-hebrew';
import { HeaderComponentStyles, HeaderStyle } from '../../Theme/ThemeInterfaces';
import { ReactComponent as BetimIcon } from '../../Theme/Icons/LayoutIcons/BetimHeaderIcon.svg';

interface HeaderProps {
  headerStyle?: HeaderStyle;
}

export const HeaderComponent = styled('div')<HeaderProps>(({ headerStyle }) => ({
  ...HeaderComponentStyles[headerStyle || HeaderStyle.PRIMARY],
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
