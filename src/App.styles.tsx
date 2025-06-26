import { styled } from '@mui/material/styles';
import { PRIMARY_BACKGROUND } from './theme/colorTheme';
import { MAIN_FONT } from '@theme/fonts';

export const PrimaryBackground = styled('div')({
  display: 'flex',
  backgroundColor: PRIMARY_BACKGROUND,
  fontFamily: MAIN_FONT,
  width: '100%',
  flexDirection: 'column',
});
