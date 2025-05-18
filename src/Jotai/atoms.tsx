import { atomWithStorage } from 'jotai/utils';
import { User } from '../Interfaces';
import { FooterStyle, HeaderStyle } from '../Theme/ThemeInterfaces';
import { atom } from 'jotai';

export const layoutAtom = atomWithStorage<{
  headerStyle: HeaderStyle;
  footerStyle: FooterStyle;
}>('layoutAtom', {
  headerStyle: HeaderStyle.PRIMARY,
  footerStyle: FooterStyle.SHOW,
});

export const layoutEphemeralAtom = atom<{ overlay?: () => void }>({});

export const userAtom = atomWithStorage<User | null>('userAtom', null);
