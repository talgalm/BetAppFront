import { styled } from '@mui/material/styles';

export const RegularCircle = styled('div')({
  width: 36,
  height: 36,
  borderRadius: '50%',
  border: '1.5px solid var(--Background-Lavender-Mist, #EDEDF5)',
  background: "url('<path-to-image>') lightgray 50% / cover no-repeat",
  transition: 'transform 0.2s ease',
  left: 5,
  position: 'relative',
});

export const MoreCircle = styled('div')({
  width: 36,
  height: 36,
  borderRadius: '50%',
  border: '1.5px solid var(--Background-Lavender-Mist, #EDEDF5)',
  background: 'var(--Status-Wild-Blue-Yonder, #7F8CB9)',
  transition: 'transform 0.2s ease',
  left: 5,
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
