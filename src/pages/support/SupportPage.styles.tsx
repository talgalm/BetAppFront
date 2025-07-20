import { Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DIVIDER_GREY } from '@theme/colorTheme';

export const HomeDivContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  direction: 'rtl',
  justifyContent: 'center',
  padding: 16,
  width: '100%',
  gap: 16,
  marginTop: 60,
});

export const ActionsContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: 4,
});

export const StyledDivider = styled(Divider)({
  width: '100%',
  borderBottomWidth: 1,
  borderColor: DIVIDER_GREY,
});

export const RowFixed = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 12,
});

export const VersionContainer = styled('div')({
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
});
