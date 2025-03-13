import { styled } from '@mui/material/styles';

export const AddParticipantsDiv = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  direction: 'rtl',
  flexWrap: 'wrap',
  gap: 8,
  width: '100%',
  maxWidth: '100%',
  alignItems: 'center',
  justifyContent: 'flex-start',
  paddingTop: 8,
  boxSizing: 'border-box',
});

export const TagContainer = styled('div')({
  position: 'relative',
});

export const AddParticipantTag = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  direction: 'rtl',
  gap: 4,
});

export const ParticipantTag = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  direction: 'rtl',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 10,
  gap: 10,
  height: 28,
  backgroundColor: '#DCE1F5',
  borderRadius: 4,
  opacity: 1,
  cursor: 'pointer',
  boxShadow: `
    0px 1px 1px 0px #4E6BCC1A,
    0px 3px 3px 0px #4E6BCC17,
    0px 6px 3px 0px #4E6BCC0D,
    0px 10px 4px 0px #4E6BCC03,
    0px 16px 4px 0px #4E6BCC00
  `,
});

export const IconAddDiv = styled('div')({
  padding: '2px 8px 0px 8px',
  borderRadius: 4,
  backgroundColor: '#EDEDF5',
  boxShadow: `
    0px 0px 1px 0px #48494D1A,
    0px 2px 2px 0px #48494D17,
    0px 4px 3px 0px #48494D0D,
    0px 8px 3px 0px #48494D03,
    0px 12px 3px 0px #48494D00
  `,
});

export const PopUpDiv = styled('div')({
  position: 'absolute',
  top: '100%',
  right: 0,
  marginTop: 4,
  width: '100%',
  height: 34,
  padding: 7,
  gap: 4,
  borderRadius: '8px',
  border: '1.5px solid #7F8CB9',
  opacity: 1,
  backgroundColor: '#F8F8FD',
  zIndex: 1000,
});

export const PopUpRow = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  direction: 'rtl',
  justifyContent: 'space-between',
  paddingBottom: 4,
});
