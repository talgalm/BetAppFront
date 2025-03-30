import { styled } from '@mui/material/styles';

export const FilesContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '23vh',
  backgroundColor: '#EEF9F8',
  borderRadius: 8,
  border: `1px dashed #15AB94`,
  flexDirection: 'column',
  gap: 8,
});
export const FilesRow = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  marginTop: 10,
  marginBottom: 20,
});
