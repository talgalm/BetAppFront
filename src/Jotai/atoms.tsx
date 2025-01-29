import { atomWithStorage } from 'jotai/utils';
import { Group, User } from '../api/interfaces';
import { FooterStyle, HeaderStyle } from '../Theme/ThemeInterfaces';

export const layoutAtom = atomWithStorage<{
  headerStyle: HeaderStyle;
  footerStyle: FooterStyle;
}>('layoutAtom', {
  headerStyle: HeaderStyle.PRIMARY_EXPAND,
  footerStyle: FooterStyle.SHOW,
});

export const userAtom = atomWithStorage<User>('userAtom', {
  username: 'TalG',
});

export const groupAtom = atomWithStorage<Group>('groupAtom', {
  groupId: '',
  groupName: '',
  users: [],
});
