import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { PRIMARY_GREEN, PRIMARY_GREY } from '@theme/colorTheme';

export const HeaderContainer = styled('div')({
  width: '100%',
  padding: 16,
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  textAlign: 'start',
  direction: 'rtl',
});

export const SignInContainer = styled('div')({
  width: '100%',
  padding: 16,
  display: 'flex',
  direction: 'rtl',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  gap: 11,
});

export const CubesContainer = styled('div')({
  width: '100%',
  padding: 0,
  display: 'flex',
  direction: 'ltr',
  justifyContent: 'flex-start',
  flexDirection: 'row',
  gap: 8,
});

export const DontHaveAccountContainer = styled('div')({
  display: 'flex',
  direction: 'rtl',
  flexDirection: 'row',
  justifyContent: 'center',
  alignContent: 'center',
  width: '100%',
  padding: 16,
  gap: 3,
});

interface CubeInputProps {
  hasValue?: boolean;
}

export const CubeInput = styled(TextField, {
  shouldForwardProp: (prop: string) => prop !== 'hasValue',
})<CubeInputProps>(({ hasValue }) => ({
  borderRadius: 8,
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: hasValue ? `1px solid ${PRIMARY_GREEN}` : `1px solid ${PRIMARY_GREY}`,
    },
    '&:hover fieldset': {
      border: hasValue ? `1px solid ${PRIMARY_GREEN}` : `1px solid ${PRIMARY_GREY}`,
    },
    '&.Mui-focused fieldset': {
      border: `1px solid ${PRIMARY_GREEN}`,
    },
  },
  '& .MuiInputBase-input': {
    textAlign: 'center',
    fontFamily: 'Fredoka',
    fontSize: 28,
    fontWeight: 500,
  },
}));
