import { styled } from '@mui/material/styles';
import { FooterComponentStyles, FooterStyle } from '../../Theme/ThemeInterfaces';

interface FooterProps {
  footerStyle?: FooterStyle;
}

export const FooterComponent = styled('div')<FooterProps>(({ footerStyle }) => ({
  ...FooterComponentStyles[footerStyle || FooterStyle.SHOW],
}));

export const ButtonDiv = styled('div')({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  flexShrink: 0,
});
