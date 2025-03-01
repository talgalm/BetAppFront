import { styled } from '@mui/material/styles';
import { TypographyTypes } from '../../../Theme/Typography/typography';
import { TEXT_THIRD_COLOR } from '../../../Theme/ColorTheme';

export const InputContainer = styled('div')({
  position: 'relative',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
});

export const IconWrapper = styled('div')({
  position: 'absolute',
  right: 12,
  top: 26,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const WInput = styled('textarea')<{
  typography: typeof TypographyTypes.H5;
  isWriting: boolean;
}>(({ typography, isWriting }) => ({
  width: '100%',
  direction: 'rtl',
  marginTop: 16,
  border: isWriting ? `1.5px solid ${TEXT_THIRD_COLOR}` : '1.5px solid #9798A2',
  backgroundColor: '#EDEDF5',
  borderRadius: 360,
  fontSize: typography.fontSize,
  fontFamily: 'IBM Plex Sans Hebrew',
  fontWeight: typography.fontWeight,
  outline: 'none',
  color: TEXT_THIRD_COLOR,
  padding: '12px 16px',
  height: 42,
  overflowY: 'hidden',
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
  overflowWrap: 'break-word',
  paddingRight: '40px', // Ensure space for icon in RTL
  '&::placeholder': {
    color: '#BDBDBD',
  },
}));
