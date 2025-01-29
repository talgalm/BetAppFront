import { styled } from '@mui/material/styles';

export const MainContainer = styled('div')({
  display: 'flex',
  width: '100%',
  alignContent: 'center',
  flexDirection: 'column',
  padding: 16,
  paddingTop: 8,
  gap: 8,
});

export const InputWrapper = styled('div')({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  flexDirection: 'row-reverse',
});

export const GrayLine = styled('div')({
  height: '1px',
  width: '100%',
  margin: '4px 0',
  flexShrink: 0,
  alignSelf: 'stretch',
  borderRadius: 1,
  background: 'var(--Text-Cool-Gray, #9798A2)',
});

export const GroupsContainer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  paddingTop: 13,
  gap: 12,
});

export const ShowMeMore = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'stretch',
  width: '100%',
  paddingTop: 16,
  paddingBottom: 16,
  height: 34,
  color: 'black',
});

export const CollapsibleContainer = styled('div')({});
