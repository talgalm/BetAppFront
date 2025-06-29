import { styled } from '@mui/material/styles';
import {
  PRIMARY_WHITE,
  PRIMARY_GREEN,
  LIGHT_GREEN,
  DIVIDER_PURPLE,
  CONTAINER_WHITE,
} from '@theme/colorTheme';

export const HomeWrapperContainer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%',
  overflowY: 'hidden',
});

export const HomeDivContainer = styled('div')<{ marginTop?: number }>(({ marginTop = 50 }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop,
  width: '100%',
  position: 'fixed',
  backgroundColor: `${PRIMARY_WHITE}`,
}));

export const ProgressBarContainer = styled('div')<{ marginTop?: number }>(({ marginTop = 0 }) => ({
  position: 'fixed',
  width: '100%',
  padding: 16,
  paddingRight: 16,
  paddingLeft: 24,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 0,
  backgroundColor: 'transparent',
  marginTop: marginTop,
}));

export const BottomContainer = styled('div')({
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 16,
  marginTop: 'auto',
  position: 'fixed',
  bottom: -1,
  left: 0,
  right: 0,
  transition: 'all 0.2s ease-out',
  zIndex: 9999,
  backgroundColor: 'white',
});
export const PageContainer = styled('div')({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  textAlign: 'right',
  gap: 16,
  paddingRight: 16,
  paddingLeft: 16,
  marginTop: 10,
  overflowY: 'scroll',
  overflowX: 'hidden',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

export const ContentContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 10,
  width: '100%',
  height: '100%',
  direction: 'rtl',
});

export const CheckboxContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: 4,
  width: '100%',
  direction: 'rtl',
  marginLeft: 12,
  marginTop: -24,
});

export const CheckboxTextContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginTop: 8,
  gap: 4,
});

export const RowContentContainer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  direction: 'rtl',
  width: '100%',
  textAlign: 'start',
});

export const RowCoinContentContainer = styled('div')({
  width: 'calc(50% - 4px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'start',
});

export const RowCenterContentContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  direction: 'rtl',
  width: '100%',
  gap: 5,
  textAlign: 'center',
});

export const ButtonsContainer = styled('div')({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  flexDirection: 'column',
  gap: 15,
  padding: 16,
  zIndex: 10,
});

export const ButtonsContainerInner = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  gap: 10,
  alignItems: 'center',
  width: '100%',
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
  backgroundColor: `${PRIMARY_WHITE}`,
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

export const FilesContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '23vh',
  backgroundColor: CONTAINER_WHITE,
  borderRadius: 8,
  border: `1px dashed ${PRIMARY_GREEN}`,
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
