import { styled } from '@mui/material/styles';

export const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  width: '100%',
});

export const LinkDiv = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  direction: 'rtl',
  width: '100%',
  justifyContent: 'flex-start',
  padding: 16,
});

export const CheckboxDiv = styled('div')({
  display: 'flex',
  width: '100%',
  direction: 'rtl',
  paddingRight: 8,
  marginTop: -10,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
});

export const IconsDiv = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 10,
  width: '70%',
  gap: 16,
});
