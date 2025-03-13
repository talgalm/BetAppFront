import { styled } from '@mui/material/styles';
import { TypographyTypes } from '../../../Theme/Typography/typography';
import { TEXT_THIRD_COLOR } from '../../../Theme/ColorTheme';

export const BetInput = styled('textarea')<{
  typography: typeof TypographyTypes.H5;
  isWriting: boolean;
  setHeight?: boolean;
}>(({ typography, isWriting, setHeight }) => ({
  width: '100%',
  direction: 'rtl',
  marginTop: 16,
  border: isWriting ? `1.5px solid ${TEXT_THIRD_COLOR}` : '1.5px solid transparent',
  backgroundColor: '#FFFFFF',
  borderRadius: 8,
  fontSize: typography.fontSize,
  fontFamily: 'IBM Plex Sans Hebrew',
  fontWeight: typography.fontWeight,
  outline: 'none',
  color: TEXT_THIRD_COLOR,
  padding: setHeight ? '8px 8px 0px 0px' : '16px 16px 96px',
  resize: 'none',
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
  overflowWrap: 'break-word',
  boxShadow: `
    0px 2px 5px 0px #9798A21A,
    0px 10px 10px 0px #9798A217,
    0px 22px 13px 0px #9798A20D,
    0px 40px 16px 0px #9798A203,
    0px 62px 17px 0px #9798A200
  `,
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
