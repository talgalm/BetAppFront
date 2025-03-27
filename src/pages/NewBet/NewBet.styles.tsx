import { styled } from '@mui/material/styles';

export const PageContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  textAlign: 'right',
  gap: 16,
  paddingRight: 24,
  paddingLeft: 24,
  paddingTop: 80,
  marginTop: 10,
  height: '92vh',
  overflowY: 'auto',
  overflowX: 'hidden',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

export const ContentContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 16,
  width: '100%',
  height: '100%',
  direction: 'rtl',
});

export const CheckboxContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: 4,
  width: '100%',
  direction: 'rtl',
  marginLeft: 12,
  marginTop: -24,
});

export const CheckboxTextContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginTop: 8,
  gap: 4,
});

export const RowContentContainer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  direction: 'rtl',
  width: '100%',
  textAlign: 'start',
});

export const CoinsGridContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  gap: 8,
  width: '100%',
});

export const RowCoinContentContainer = styled('div')({
  width: 'calc(50% - 4px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'start',
});

export const CoinContainer = styled('div')<{
  isSelected?: boolean;
}>(({ isSelected }) => ({
  display: 'flex',
  width: '96%',
  height: '15vh',
  backgroundColor: '#EEF9F8',
  borderRadius: 12,
  justifyContent: 'center',
  alignItems: 'center',
  gap: 4,
  border: isSelected ? '4px solid #15AB94' : 'none',
  cursor: 'pointer',
}));

export const RowCenterContentContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  direction: 'rtl',
  width: '100%',
  gap: 5,
  textAlign: 'center',
});

export const ButtonsContainer = styled('div')({
  marginTop: 'auto',
  marginBottom: 0,
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  gap: 15,
});

export const ButtonsContainerInner = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  gap: 10,
  alignItems: 'center',
  width: '100%',
});

export const ParticipantsContent = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
  gap: 10,
  alignItems: 'flex-start',
  flexDirection: 'column',
  width: '100%',
  height: '30vh',
  marginTop: 25,
  borderBottom: '1px solid #C8C8E1',
});

export const ConditionsContent = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
  gap: 25,
  // overflowY: 'auto',
  // height: '40vh',
  alignItems: 'flex-start',
  flexDirection: 'column',
  width: '100%',
});

export const ConditionsRowContent = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexDirection: 'column',
  width: '100%',
  gap: 0,
});

export const ParticipantsContentRow = styled('div')({
  width: '100%',
  flexDirection: 'row',
  display: 'flex',
  justifyContent: 'space-between',
  gap: 10,
  alignItems: 'center',
  paddingTop: 4,
  paddingBottom: 4,
  paddingLeft: 8,
});

export const ParticipantsContentUser = styled('div')({
  width: '50%',
  flexDirection: 'row',
  display: 'flex',
  gap: 10,
  alignItems: 'center',
  fontSize: 10,
});

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
