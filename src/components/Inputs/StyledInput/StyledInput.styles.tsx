import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';
import {
  ERROR_COLOR,
  GREY2_INPUT,
  GREY_INPUT,
  LIGHT_INPUT,
  PRIMARY_WHITE,
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
}>(({ marginExtand = false, startIconGap = false }) => ({
  '& .MuiOutlinedInput-root': {
    fontFamily: 'Fredoka, sans-serif !important',
    borderRadius: 16,
    backgroundColor: PRIMARY_WHITE,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
    '& fieldset': {
      borderColor: LIGHT_INPUT,
    },
    '&:hover fieldset': {
      borderColor: GREY_INPUT,
    },
    '&.Mui-focused fieldset': {
      borderColor: GREY2_INPUT,
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
  '& .MuiInputAdornment-root': {
    margin: '0px',
  },
  '& .MuiFormHelperText-root': {
    textAlign: 'right',
    lineHeight: 1,
    fontFamily: 'Fredoka, sans-serif !important',
  },
}));
