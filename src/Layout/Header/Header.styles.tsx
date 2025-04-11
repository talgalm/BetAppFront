import { styled } from '@mui/material/styles';
import '@fontsource/ibm-plex-sans-hebrew';
import { HeaderComponentStyles, HeaderStyle } from '../../Theme/ThemeInterfaces';

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

export const ReturnArrowDiv = styled('div')({
  position: 'absolute',
  right: 16,
});
