import { styled } from '@mui/material/styles';
import { Avatar, Divider } from '@mui/material';
import { ReactComponent as CloseIcon } from '@assets/icons/FullClose.svg';
import {
  PRIMARY_WHITE,
  LIGHT_GREEN,
  PRIMARY_BLACK,
  TAG_PURPLE,
  DIVIDER_GREY,
} from '@theme/colorTheme';

export const RowCenterContentContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  direction: 'rtl',
  width: '100%',
  gap: 5,
  marginTop: -16,
  textAlign: 'center',
});

export const SelectedContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  borderRadius: 16,
  paddingTop: 10,
  paddingRight: 16,
  paddingLeft: 16,
  gap: 10,
  overflowX: 'auto',
  overflowY: 'hidden',
  scrollBehavior: 'smooth',
  whiteSpace: 'nowrap',
  boxShadow: `
    0px 2px 5px 0px #ADADAD33,
    0px 10px 10px 0px #ADADAD2E,
    0px 22px 13px 0px #ADADAD1A,
    0px 39px 16px 0px #ADADAD08,
    0px 61px 17px 0px #ADADAD00
  `,
  '&::-webkit-scrollbar': {
    height: 6,
    display: 'none',
  },
  '&::-webkit-scrollbar-thumb': {
    background: TAG_PURPLE,
    borderRadius: 10,
  },
});

export const ParticipantsContent = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
  gap: 3,
  alignItems: 'flex-start',
  flexDirection: 'column',
  width: 'calc(100% + 10px)',
  backgroundColor: `${PRIMARY_WHITE}`,
});

export const ParticipantsContentRow = styled('div')<{ background?: boolean }>(
  ({ background = 'trasnperent' }) => ({
    width: '100%',
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    padding: 4,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: background ? `${LIGHT_GREEN}` : 'transparent',
  })
);

export const ParticipantsContentUser = styled('div')({
  width: '50%',
  flexDirection: 'row',
  display: 'flex',
  gap: 10,
  alignItems: 'center',
  fontSize: 10,
});

export const AvatarWrapper = styled('div')({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
});

export const StyledAvatar = styled(Avatar)({
  width: 36,
  height: 36,
  fontSize: 18,
  flexShrink: 0,
});

export const SmallAvatar = styled(Avatar)({
  backgroundColor: 'grey',
  width: 24,
  height: 24,
  fontSize: 11,
});

export const Initials = styled('div')({
  marginTop: -15,
  marginBottom: 5,
  fontSize: 12,
});

export const CloseButton = styled('div')({
  position: 'absolute',
  top: -5,
  right: -5,
});

export const CloseIconStyled = styled(CloseIcon)({
  width: 16,
  height: 16,
});

export const NameText = styled('div')({
  marginTop: 5,
  marginBottom: 5,
  fontSize: 12,
  color: PRIMARY_BLACK,
  textAlign: 'center',
});

export const ParticipantsCollapseContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
});

export const ParticipantsCollapseRow = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const StyledDivider = styled(Divider)({
  width: '100%',
  borderBottomWidth: 1,
  borderColor: DIVIDER_GREY,
  marginBottom: 16,
});
