import { styled } from '@mui/material/styles';
import { ReactComponent as CloseIcon } from '@assets/icons/FullClose.svg';
import { PRIMARY_GREEN, LIGHT_GREEN, TAG_PURPLE, DIVIDER_PURPLE } from '@theme/colorTheme';

export const FilesContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 343,
  height: '30vh',
  backgroundColor: `${LIGHT_GREEN}`,
  borderRadius: 8,
  border: `1px dashed ${PRIMARY_GREEN}`,
  flexDirection: 'column',
});

export const FilesRow = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  width: '80%',
  gap: 4,
});

export const UploadIconWrapper = styled('div')({});

export const SelectedContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: 343,
  height: '100%',
  borderRadius: 16,
  padding: 16,
  gap: 8,
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
    background: DIVIDER_PURPLE,
    borderRadius: 10,
  },
});

export const ParticipantsCollapseContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
});

export const ParticipantsCollapseRow = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
});

export const AvatarWrapper = styled('div')({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
});

export const StyledPDF = styled('div')({
  height: 36,
  display: 'inline-flex',
  padding: '4px 6px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 4,
  flexShrink: 0,
  borderRadius: 6,
  backgroundColor: TAG_PURPLE,
});

export const StyledImage = styled('img')({
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 36,
  height: 36,
  objectFit: 'cover',
  borderRadius: 6,
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
