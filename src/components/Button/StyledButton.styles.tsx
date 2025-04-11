import { styled } from '@mui/material/styles';
import { PRIMARY_COLOR, SECONDARY_GREEN } from '../../Theme/ColorTheme';

interface StyledButtonProps {
  buttonColor?: string;
  textColor?: string;
}

export const ButtonStyles = styled('button')<StyledButtonProps>(({ buttonColor, disabled }) => ({
  width: '100%',
  height: 56,
  padding: 15,
  borderRadius: 12,
  backgroundColor: disabled ? SECONDARY_GREEN : buttonColor || PRIMARY_COLOR,
  cursor: disabled ? 'not-allowed' : 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 10,
  // border: disabled
  //   ? '0px solid #A9A9A9'
  //   : buttonColor !== PRIMARY_COLOR
  //     ? `1.5px solid ${PRIMARY_COLOR}`
  //     : 'none',
  border: 'none',
  color: '#FFFFFF',
  opacity: disabled ? 0.6 : 1,
  pointerEvents: disabled ? 'none' : 'auto',
}));
