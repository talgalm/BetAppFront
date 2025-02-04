import { styled } from '@mui/material/styles';
import { ReactComponent as CancelIconBase } from '../../../Theme/Icons/Close.svg';
import { TEXT_THIRD_COLOR } from '../../../Theme/ColorTheme';

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

export const CollapseInnerDiv = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});

export const CollapseOuterDiv = styled('div')({
  width: '100%',
  direction: 'ltr',
  marginTop: '10px',
  display: 'flex',
  flexDirection: 'column',
});

export const StyledCancelIcon = styled(CancelIconBase)({
  cursor: 'pointer',
  color: TEXT_THIRD_COLOR,
  marginTop: '32px',
  width: 24,
  height: 24,
});
