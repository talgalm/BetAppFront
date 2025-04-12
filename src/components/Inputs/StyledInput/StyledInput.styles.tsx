import { styled } from '@mui/material/styles';
import { TypographyTypes } from '../../../Theme/Typography/typography';
import { TEXT_THIRD_COLOR } from '../../../Theme/ColorTheme';
import { TextField } from '@mui/material';
import { padding } from 'polished';

export const BetInput = styled('input')<{
  typography: typeof TypographyTypes.H7;
  isWriting?: boolean;
  setHeight?: boolean;
  isIcon?: boolean;
}>(({ typography, isWriting, setHeight, isIcon = false }) => ({
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
  padding: setHeight ? `0px ${isIcon ? 32 : 16}px 0px 0px` : '24px 16px 96px',
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
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
});

export const IconWrapperEnd = styled('div')({
  position: 'absolute',
  left: 12,
  bottom: 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const IconWrapperStart = styled('div')({
  position: 'absolute',
  right: 12,
  bottom: 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
    '& fieldset': {
      borderColor: '#E0E0E0',
    },
    '&:hover fieldset': {
      borderColor: '#BDBDBD',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#9E9E9E',
    },
  },
  '& .MuiOutlinedInput-input': {
    direction: 'rtl',
    textAlign: 'right',
    overflowY: 'auto',
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 16,
    paddingLeft: 16,

    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#E0E0E0',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#BDBDBD',
    },
  },
  '& .MuiInputAdornment-root': {
    margin: '0px',
  },
}));
