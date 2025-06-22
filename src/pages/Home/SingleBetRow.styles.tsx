import { AvatarGroup } from '@mui/material';
import { styled } from '@mui/material/styles';
import { keyframes } from '@mui/system';

interface NotificationCubeProps {
  backgroundColor?: string;
  animate?: boolean;
}

const popIn = keyframes`
  0% {
    transform: scale(0.95);
    opacity: 0;
  }
  60% {
    transform: scale(1.03);
    opacity: 1;
  }
  100% {
    transform: scale(1);
  }
`;
const pulseShadow = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(203, 198, 227, 0.5);
  }
  70% {
    box-shadow: 0 0 8px 4px rgba(203, 198, 227, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(203, 198, 227, 0);
  }
`;

export const NotificationContainer = styled('div')<NotificationCubeProps>(
  ({ backgroundColor = '#fff', animate = false }) => ({
    padding: 16,
    borderRadius: 16,
    gap: 16,
    width: '100%',
    flexDirection: 'column',
    direction: 'rtl',
    display: 'flex',
    backgroundColor,
    boxShadow:
      backgroundColor === '#fff'
        ? `
        0px 2px 5px 0px #CBC6E31A,
        0px 9px 9px 0px #CBC6E317,
        0px 21px 13px 0px #CBC6E30D,
        0px 38px 15px 0px #CBC6E303,
        0px 59px 17px 0px #CBC6E300,
        0px -4px 8px 0px #0000000A
      `
        : 'none',

    animation: animate ? `${pulseShadow} 1200ms ease-out` : 'none',
  })
);

export const NotificationHeader = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyItems: 'flex-start',
  justifyContent: 'flex-start',
  gap: 8,
});

export const NotificationRow = styled('div')({
  display: 'flex',
  width: '100%',
  gap: 16,
});

export const ActionRow = styled('div')({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  paddingLeft: 16,
});

export const TagStyled = styled('div')<{ background?: string; gap?: number }>(
  ({ background, gap }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    background,
    padding: background ? '4px 6px 4px 6px' : 'none',
    borderRadius: background ? 6 : 'none',
    gap: gap ?? 4,
  })
);

export const NotificationTextHeader = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  marginTop: -2.5,
});

export const StyledAvatarGroup = styled(AvatarGroup)(({ theme }) => ({
  paddingRight: 8,
  '& .MuiAvatarGroup-avatar': {
    marginRight: -8,
    marginLeft: 0,
  },
  '& .MuiAvatarGroup-avatar:first-of-type': {
    marginRight: -8,
  },
}));
