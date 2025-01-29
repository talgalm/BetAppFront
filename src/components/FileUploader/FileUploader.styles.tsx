import { styled } from '@mui/material/styles';
export const AddFilesDiv = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  direction: 'rtl',
  flexWrap: 'wrap',
  gap: 8,
  width: '100%',
  maxWidth: '100%',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  paddingTop: 8,
  boxSizing: 'border-box',
});

export const hideLongNameStyles = {
  maxWidth: 125,
  height: 25,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
};

export const AddParticipantTag = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  direction: 'rtl',
  gap: 8,
});

export const ParticipantTag = styled('div')<{ borderColor?: string }>(({ borderColor }) => ({
  display: 'flex',
  flexDirection: 'row',
  direction: 'rtl',
  width: 'auto',
  padding: 10,
  gap: 10,
  height: 44,
  borderRadius: '8px',
  border: `1.5px solid ${borderColor || 'black'}`,
  opacity: 1,
}));
