import { atomWithStorage } from 'jotai/utils';
import { atom } from 'jotai';
import { HeaderStyle } from 'Theme/layoutStyles';

export const layoutAtom = atomWithStorage<{ headerStyle: HeaderStyle }>('layoutAtom', {
  headerStyle: HeaderStyle.PRIMARY,
});

export const headerAtom = atom<HeaderStyle>(HeaderStyle.PRIMARY);
export const layoutEphemeralAtom = atom<{ overlay?: () => void }>({});
