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
  id: '2ad7e2f6-b8f9-48d0-b7ed-c94d906bdc73',
  phoneNumber: '',
});

export const groupAtom = atomWithStorage<Group>('groupAtom', {
  id: '',
  name: '',
  users: [],
});
