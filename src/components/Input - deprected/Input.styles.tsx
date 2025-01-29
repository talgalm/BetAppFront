import { styled } from '@mui/material/styles';
import { SECONDERY_COLOR } from '../../Theme/ColorTheme';

export const StyledContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '16px',
  width: '100%',
  position: 'relative',
});

export const StyledLabel = styled('label')({
  fontSize: '14px',
  fontWeight: 'bold',
  marginBottom: '8px',
  color: '#333',
});

export const StyledInputWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
});

export const StyledInput = styled('input')<{
  error?: boolean;
}>(({ error }) => ({
  display: 'block',
  padding: '10px 12px',
  borderRadius: '10px',
  border: `3px solid ${error ? 'red' : '#ccc'}`,
  fontSize: '14px',
  fontWeight: 600,
  color: '#333',
  backgroundColor: error ? '#ffe6e6' : '#fff',
  transition: 'border-color 0.3s, background-color 0.3s, box-shadow 0.3s, border-width 0.3s',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  width: '100%',
  '&:hover': {
    borderColor: SECONDERY_COLOR,
  },
  '&:focus': {
    outline: 'none',
    borderColor: SECONDERY_COLOR,
  },
}));

export const VisibilityButton = styled('button')({
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  position: 'absolute',
  right: '10px',
  top: '55%',
  transform: 'translateY(-50%)',
  fontSize: '18px',
});

export const ErrorDiv = styled('div')({
  color: 'red',
  fontSize: '12px',
  marginTop: '4px',
});
