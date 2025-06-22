import { Avatar, Divider, styled } from '@mui/material';

export const SummaryContainer = styled('div')({
  display: 'flex',
  width: '105%',
  flexDirection: 'column',
  gap: 10,
  height: 'calc(70vh - 130px)',
  overflowY: 'auto',
  direction: 'ltr',
  paddingRight: 10,
});

export const SummaryRow = styled('div')<{
  background?: string;
  gap?: number;
  betCreation?: boolean;
}>(
  ({
    background,
    gap,
    betCreation,
  }: {
    background?: string;
    gap?: number;
    betCreation?: boolean;
  }) => ({
    display: 'flex',
    width: betCreation ? '100%' : 'fit-content',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    background,
    padding: background ? '4px 6px 4px 6px' : 'none',
    borderRadius: background ? 6 : 'none',
    gap: gap ?? 4,
    marginBottom: betCreation ? 0 : 10, //
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
  borderBottomWidth: 1,
  borderColor: '#C8C8E1',
});

export const SmallAvatar = styled(Avatar)({
  backgroundColor: 'grey',
  width: 24,
  height: 24,
  fontSize: 11,
});
