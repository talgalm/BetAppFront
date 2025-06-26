import { styled } from '@mui/material/styles';
import { TEXT_THIRD_COLOR } from '../../../Theme/colorTheme';
import { TextField } from '@mui/material';
import { padding } from 'polished';

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
    backgroundColor: '#fff',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
    '& fieldset': {
      borderColor: '#E0E0E0',
    },
    '&:hover fieldset': {
      borderColor: '#BDBDBD',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#C8C8D0',
    },
    '&.Mui-error fieldset': {
      borderColor: '#F44336',
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
  '& .MuiFormHelperText-root': {
    textAlign: 'right',
    lineHeight: 1,
    fontFamily: 'Fredoka, sans-serif !important',
  },
}));
