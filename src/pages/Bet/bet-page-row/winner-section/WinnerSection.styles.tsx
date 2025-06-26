import { styled } from '@mui/material/styles';
import { PRIMARY_COLOR } from '@theme/colorTheme';

export const WinnerContainerWrapper = styled('div')({
  padding: 16,
});
export const WinnerContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  width: '100%',
  borderRadius: 8,
  gap: 8,
  padding: 8,
  backgroundColor: '#EFFDF4',
  boxShadow: `
      0px 1px 3px 0px ${PRIMARY_COLOR}1A,
      0px 5px 5px 0px ${PRIMARY_COLOR}17,
      0px 12px 7px 0px ${PRIMARY_COLOR}0D,
      0px 22px 9px 0px ${PRIMARY_COLOR}03,
      0px 34px 10px 0px ${PRIMARY_COLOR}00
    `,
});
export const WinnerRow = styled('div')({
  display: 'flex',
  flexDirection: 'row-reverse',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 16,
});

export const WinnerRowInner = styled('div')({
  display: 'flex',
  flexDirection: 'row-reverse',
  gap: 8,
});

export const WinnerRowInnerSec = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: 8,
  alignItems: 'center',
  justifyContent: 'center',
});
