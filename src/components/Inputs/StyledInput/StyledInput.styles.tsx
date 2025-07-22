import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';
import {
  ERROR_COLOR,
  GREY2_INPUT,
  GREY_INPUT,
  LIGHT_INPUT,
  PRIMARY_WHITE,
  SECONDARY_BLACK,
  TAG_PURPLE,
} from '@theme/colorTheme';

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
  backgroundColor: 'transparent',
});

export const IconWrapperEnd = styled('div')({
  position: 'absolute',
  left: 18,
  top: 18,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const IconWrapperStart = styled('div')({
  position: 'absolute',
  zIndex: 99,
  right: 18,
  top: 18,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const StyledTextField = styled(TextField)<{
  marginExtand?: boolean;
  startIconGap?: boolean;
  isLabel?: boolean;
}>(({ marginExtand = false, startIconGap = false, isLabel = false }) => ({
  backgroundColor: isLabel ? TAG_PURPLE : '',
  borderRadius: 8,
  '& .MuiInputLabel-root.Mui-focused': {
    color: SECONDARY_BLACK,
  },
  '& .MuiOutlinedInput-root': {
    fontFamily: 'Fredoka, sans-serif !important',
    borderRadius: 16,
    backgroundColor: PRIMARY_WHITE,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
    '& fieldset': {
      borderColor: LIGHT_INPUT,
      '& legend': {
        textAlign: 'right',
        marginLeft: 'auto',
        marginRight: '24px',
      },
    },
    '&:hover fieldset': {
      borderColor: GREY_INPUT,
    },
    '&.Mui-focused fieldset': {
      borderColor: LIGHT_INPUT,
      borderWidth: '0px',
    },
    '&.Mui-error fieldset': {
      borderColor: ERROR_COLOR,
    },
  },
  '& .MuiOutlinedInput-input': {
    direction: 'rtl',
    textAlign: 'right',
    overflowY: 'auto',
    paddingTop: marginExtand ? 0 : 16.5,
    paddingBottom: 16.5,
    paddingRight: marginExtand ? 0 : startIconGap ? 42 : 16.5,
    paddingLeft: 16,

    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      background: LIGHT_INPUT,
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: GREY_INPUT,
    },
  },
  // Fix for RTL label positioning
  '& .MuiInputLabel-root': {
    right: 24,
    left: 'auto',
    color: SECONDARY_BLACK,
    transformOrigin: 'right',
    fontFamily: 'Fredoka, sans-serif !important',
    '&.MuiInputLabel-shrink': {
      transform: 'translate(11px, 3px) scale(0.75)',
    },
  },
  // Fix for RTL label when focused/shrunk
  '& .MuiInputLabel-outlined': {
    color: SECONDARY_BLACK,
    '&.MuiInputLabel-shrink': {
      transform: 'translate(11px, 3px) scale(0.75)',
    },
  },
  '& .MuiInputAdornment-root': {
    margin: '0px',
  },
  '& .MuiFormHelperText-root': {
    textAlign: 'right',
    lineHeight: 1,
    fontFamily: 'Fredoka, sans-serif !important',
    direction: 'rtl',
  },
  // Fix for icons positioning in RTL
  '& .MuiInputAdornment-positionStart': {
    marginRight: 0,
    marginLeft: 8,
  },
  '& .MuiInputAdornment-positionEnd': {
    marginLeft: 0,
    marginRight: 8,
  },
  '& .MuiFilledInput-root': {
    '&::before': {
      borderBottom: 'none',
    },
    '&::after': {
      borderBottom: 'none',
    },
    '&:hover::before': {
      borderBottom: 'none',
    },
    '&.Mui-focused::after': {
      borderBottom: 'none',
    },
    '&.Mui-disabled::before': {
      borderBottom: 'none',
    },
  },
}));
