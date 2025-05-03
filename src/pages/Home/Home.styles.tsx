import { styled } from '@mui/material/styles';

export const HomeDivContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 16,
  gap: 10,
  marginTop: 44,
  marginBottom: 50,
});

export const ComplexContainer = styled('div')({
  borderRadius: 16,
  padding: 16,
  gap: 16,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#EFF6FF',
  width: '100%',
  direction: 'rtl',
  boxShadow: `
  0px 4px 9px 0px #2A68C51A,
  0px 17px 17px 0px #2A68C517,
  0px 38px 23px 0px #2A68C50D,
  0px 68px 27px 0px #2A68C503,
  0px 107px 30px 0px #2A68C500
`,
});

export const NotificationContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: 8,
  width: '100%',
  justifyContent: 'space-between',
});

interface NotificationCubeProps {
  backgroundColor?: string;
}

export const NotificationCubeContainer = styled('div')<NotificationCubeProps>(
  ({ backgroundColor = '#fff' }) => ({
    padding: 16,
    borderRadius: 8,
    gap: 8,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    backgroundColor,
    position: 'relative',
  })
);

interface NotificationNumberProps {
  backgroundColor?: string;
}

export const NotificationNumber = styled('div')<NotificationNumberProps>(
  ({ backgroundColor = '#fff' }) => ({
    borderRadius: 8,
    display: 'flex',
    width: 16,
    height: 16,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    direction: 'ltr',
    right: 0,
    top: 0,
    zIndex: 99,
    backgroundColor,
  })
);

export const BetsContainer = styled('div')({
  display: 'flex',
  textAlign: 'right',
  width: '100%',
  flexDirection: 'column',
  gap: 12,
  padding: '8px 0px 8px 0px',
});
