import { styled } from '@mui/material/styles';

interface StyledButtonProps {
  buttonColor?: string;
  textColor?: string;
}

export const ButtonStyles = styled('button')<StyledButtonProps>(({ textColor, buttonColor }) => ({
  width: '100%',
  height: 48,
  padding: 15,
  borderRadius: 12,
  backgroundColor: buttonColor || '#007BFF',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 10,
  marginTop: 50,
  marginBottom: 20,
  border: '1.5px solid #FFFFFF',
  color: textColor || '#FFFFFF',
}));
