import { styled } from '@mui/material/styles';
import { MAIN_FONT, PRIMARY_BACKGROUND } from './theme/colorTheme';

export const PrimaryBackground = styled('div')({
  display: 'flex',
  backgroundColor: PRIMARY_BACKGROUND,
  fontFamily: MAIN_FONT,
  width: '100%',
  flexDirection: 'column',
});
