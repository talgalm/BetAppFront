import { Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ConditionsContent = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
  gap: 25,
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

export const ConditionsRowContentCenter = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  marginBottom: -5,
});

export const StyledAvatar = styled(Avatar)({
  bgcolor: 'grey',
  width: 24,
  height: 24,
  fontSize: 11,
});
