import { Avatar, Divider, styled } from '@mui/material';

export const SummaryContainer = styled('div')({
  display: 'flex',
  width: '105%',
  flexDirection: 'column',
  gap: 10,
  height: 'calc(74vh - 100px)',
  overflowY: 'auto',
  direction: 'ltr',
  paddingRight: 10,
});

export const SummaryRow = styled('div')<{ background?: string; gap?: number }>(
  ({ background, gap }: { background?: string; gap?: number }) => ({
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    background,
    padding: background ? '4px 6px 4px 6px' : 'none',
    borderRadius: background ? 6 : 'none',
    gap: gap ?? 4,
  })
);

export const SummaryColumn = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 5,
});

export const ParticipantsRow = styled('div')({
  display: 'flex',
  flexDirection: 'row-reverse',
  gap: 8,
  justifyContent: 'flex-start',
  alignItems: 'felx',
});

export const StyledDivider = styled(Divider)({
  width: '100%',
  borderBottomWidth: 2,
  borderColor: '#C8C8E1',
});

export const SmallAvatar = styled(Avatar)({
  backgroundColor: 'grey',
  width: 24,
  height: 24,
  fontSize: 11,
});
