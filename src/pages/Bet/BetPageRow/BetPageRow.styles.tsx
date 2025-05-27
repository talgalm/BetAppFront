import { styled } from '@mui/material';

export const UserListContainer = styled('div')({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
});

export const UserListRowWithBorderContainer = styled('div')<{
  selected?: boolean;
  finisMode?: boolean;
}>(({ selected, finisMode }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 5,

  backgroundColor: finisMode && selected ? '#CEEFEA' : 'white',

  border: finisMode ? '1px solid var(--TealDisabled, #A8D6CC)' : 'none',
  borderRadius: finisMode ? 16 : 0,
  padding: finisMode ? 16 : 0,
  paddingBottom: finisMode ? 12 : 0,
  paddingTop: finisMode ? 12 : 0,

  ...(selected && !finisMode
    ? {
        borderBottom: '1px solid #DADADA',
        paddingBottom: 10,
      }
    : {}),
}));

export const UserListRowContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: 5,
  justifyContent: 'space-between',
  alignItems: 'center',
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
