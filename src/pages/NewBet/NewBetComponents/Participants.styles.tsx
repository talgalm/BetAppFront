import { styled } from '@mui/material/styles';
import { Avatar } from '@mui/material';
import { ReactComponent as CloseIcon } from '../../../Theme/Icons/FullClose.svg';

export const RowCenterContentContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  direction: 'rtl',
  width: '100%',
  gap: 5,
  textAlign: 'center',
});

export const SelectedContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: 343,
  height: '100%',
  borderRadius: 16,
  paddingTop: 20,
  paddingRight: 16,
  paddingLeft: 16,
  gap: 8,

  boxShadow: `
    0px 2px 5px 0px #ADADAD33,
    0px 10px 10px 0px #ADADAD2E,
    0px 22px 13px 0px #ADADAD1A,
    0px 39px 16px 0px #ADADAD08,
    0px 61px 17px 0px #ADADAD00
  `,
});

export const ParticipantsContent = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
  gap: 10,
  alignItems: 'flex-start',
  flexDirection: 'column',
  width: '100%',
  height: '30vh',
  marginTop: 10,
  borderBottom: '1px solid #C8C8E1',
  backgroundColor: '#FFFFFF',
});

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

export const ParticipantsContentRow = styled('div')<{ background?: boolean }>(
  ({ background = 'trasnperent' }) => ({
    width: '100%',
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    gap: 10,
    alignItems: 'center',
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: background ? '#CEEFEA' : 'transparent',
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

export const FilesContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '23vh',
  backgroundColor: '#EEF9F8',
  borderRadius: 8,
  border: `1px dashed #15AB94`,
  flexDirection: 'column',
  gap: 8,
});
export const FilesRow = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  marginTop: 10,
  marginBottom: 20,
});

export const AvatarWrapper = styled('div')({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
});

export const StyledAvatar = styled(Avatar)({
  backgroundColor: 'black',
  width: 36,
  height: 36,
  fontSize: 18,
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
  color: 'black',
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
