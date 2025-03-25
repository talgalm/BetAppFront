import { styled } from '@mui/material/styles';
import { LinearProgress, linearProgressClasses } from '@mui/material';

export const ProgressBarContainer = styled('div')({
  position: 'relative',
  width: '100%',
  marginBottom: 10,
  marginTop: 10,
});

export const ProgressBarContent = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  transform: 'rotate(180deg)',
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#CEEFEA',
    ...theme.applyStyles('dark', {
      backgroundColor: '#CEEFEA',
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#5CCBB8',
    transition: 'width 0.6s ease-in-out',
    ...theme.applyStyles('dark', {
      backgroundColor: '#5CCBB8',
    }),
  },
}));
export const ProgressIcon = styled('div')<{ position: 'left' | 'right' }>(({ position }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  ...(position === 'left' ? { left: -10 } : { right: -10 }),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 100,
}));

export const MovingIcon = styled('div')<{ progress: number }>(({ progress }) => ({
  position: 'absolute',
  top: '50%',
  right: `calc(${progress}% - 10px)`,
  transform: 'translateY(-50%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'width 0.6s ease-in-out',
  zIndex: 100,
}));
