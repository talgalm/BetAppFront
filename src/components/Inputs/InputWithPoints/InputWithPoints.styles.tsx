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
  gap: 6,
  width: 155,
  height: 28,
  borderRadius: 4,
  padding: '2px 8px',
  alignItems: 'center',
  boxShadow: `
    0px 0px 1px 0px #48494D1A,
    0px 2px 2px 0px #48494D17,
    0px 4px 3px 0px #48494D0D,
    0px 8px 3px 0px #48494D03,
    0px 12px 3px 0px #48494D00
  `,
});

export const Line = styled('div')({
  backgroundColor: '#C8C8E1',
  width: '100%',
  height: 1,
  borderRadius: 2,
  marginTop: 10,
  marginBottom: 10,
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
  fontFamily: 'Fredoka',
  fontWeight: typography.fontWeight,
  padding: '0',
  borderBottom: '1px solid transparent',
  textDecoration: 'underline',
  textDecorationThickness: '2px',
  textUnderlineOffset: '2px',
}));
