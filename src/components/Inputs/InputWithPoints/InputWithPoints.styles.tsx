import { styled } from '@mui/material/styles';
import { ReactComponent as CancelIconBase } from '../../../Theme/Icons/Close.svg';
import { TEXT_THIRD_COLOR } from '../../../Theme/ColorTheme';
import { TypographyTypes } from '../../../Theme/Typography/typography';

export const AddConditionsDiv = styled('div')({
  display: 'flex',
  flexDirection: 'column',
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
export const AddParticipantTag = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  direction: 'rtl',
  gap: 8,
});

export const ColumnContainer = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
});

export const CoinsContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
});

export const LineCoins = styled('div')({
  width: '50%',
  height: '2px',
  backgroundColor: '#48494D',
  margin: '-5px auto 0',
});

export const PositionContainer = styled('div')({
  position: 'relative',
  textAlign: 'center',
});

export const CalendarContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: 5,
  alignItems: 'center',
});

export const BetCoinsInput = styled('input')<{
  typography: typeof TypographyTypes.H1;
}>(({ typography }) => ({
  border: 'none',
  width: '100%',
  outline: 'none',
  direction: 'rtl',
  textAlign: 'center',
  backgroundColor: 'transparent',
  color: TEXT_THIRD_COLOR,
  fontSize: typography.fontSize,
  fontFamily: 'IBM Plex Sans Hebrew',
  fontWeight: typography.fontWeight,
  padding: '0',
  borderBottom: '1px solid transparent',
  textDecoration: 'underline',
  textDecorationThickness: '2px',
  textUnderlineOffset: '2px',
}));
