import { styled } from '@mui/material';

export const UserListContainer = styled('div')({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
});

export const UserListRowWithBorderContainer = styled('div')({
  width: '100%',
  borderBottom: '1px solid #DADADA',
  paddingBottom: 10,
});

export const UserListRowContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: 5,
  width: '100%',
});

export const AddParticipentRow = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: 5,
  marginTop: 10,
  marginBottom: 5,
});

export const UserSingleRow = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: 5,
});
