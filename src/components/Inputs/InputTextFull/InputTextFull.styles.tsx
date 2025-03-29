import { styled } from '@mui/material/styles';
import { TypographyTypes } from '../../../Theme/Typography/typography';
import { TEXT_THIRD_COLOR } from '../../../Theme/ColorTheme';
import { TextField } from '@mui/material';

export const BetInput = styled('input')<{
  typography: typeof TypographyTypes.H7;
  isWriting: boolean;
  setHeight?: boolean;
}>(({ typography, isWriting, setHeight }) => ({
  width: '100%',
  direction: 'rtl',
  marginTop: 16,
  height: 48,
  border: isWriting ? `1.5px solid ${TEXT_THIRD_COLOR}` : '1px solid #DADADA',
  backgroundColor: '#FFFFFF',
  borderRadius: 8,
  fontSize: typography.fontSize,
  fontFamily: 'Fredoka, sans-serif',
  fontWeight: typography.fontWeight,
  outline: 'none',
  color: TEXT_THIRD_COLOR,
  padding: setHeight ? '0px 16px 0px 0px' : '24px 16px 96px',
  resize: 'none',
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
  overflowWrap: 'break-word',
  boxShadow:
    '0px 1.5px 2px 0px var(--ColorsNeutralNeutralAlpha2) inset, 0px 1.5px 2px 0px var(--OverlaysBlackAlpha2) inset',
  '&::placeholder': {
    color: '#BDBDBD',
  },
}));

export const NumOfChars = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
  paddingLeft: 16,
  marginTop: -24,
});

export const WidthDiv = styled('div')({
  width: '100%',
});
