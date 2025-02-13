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

export const CollapseOuterDiv = styled('div')({
  width: '100%',
  direction: 'ltr',
  marginTop: '10px',
  display: 'flex',
  flexDirection: 'column',
});

export const IconsDiv = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: 8,
});

export const ColumnConditionDiv = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});
