import { Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CoinsGridContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  gap: 8,
  width: '100%',
});

export const CoinContainer = styled('div')<{
  isSelected?: boolean;
}>(({ isSelected }) => ({
  display: 'flex',
  width: '100%',
  height: '7vh',
  backgroundColor: '#EEF9F8',
  borderRadius: 12,
  justifyContent: 'center',
  alignItems: 'center',
  gap: 4,
  border: isSelected ? '4px solid #15AB94' : 'none',
  cursor: 'pointer',
}));

export const RowContentContainer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  direction: 'rtl',
  width: '100%',
  textAlign: 'start',
});

export const StyledDivider = styled(Divider)({
  mx: 2,
  borderRightWidth: 2,
  borderColor: '#CEEFEA',
  orientation: 'vertical',
});

export const ChangeableCoinContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  width: '80%',
  justifyContent: 'space-between',
  alignItems: 'center',
});
