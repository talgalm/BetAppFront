import { atomWithStorage } from 'jotai/utils';
import { Group, User } from '../api/interfaces';
import { FooterStyle, HeaderStyle } from '../Theme/ThemeInterfaces';

export const layoutAtom = atomWithStorage<{
  headerStyle: HeaderStyle;
  footerStyle: FooterStyle;
}>('layoutAtom', {
  headerStyle: HeaderStyle.PRIMARY,
  footerStyle: FooterStyle.SHOW,
});

export const userAtom = atomWithStorage<User | null>('userAtom', null);

export const tokenAtom = atomWithStorage<string | null>('tokenAtom', null);
