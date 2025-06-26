import { atomWithStorage } from 'jotai/utils';
import { atom } from 'jotai';
import { HeaderStyle } from 'theme/layoutStyles';

export const layoutAtom = atomWithStorage<{ headerStyle: HeaderStyle }>('layoutAtom', {
  headerStyle: HeaderStyle.PRIMARY,
});

export const headerAtom = atom<HeaderStyle>(HeaderStyle.PRIMARY);
export const layoutEphemeralAtom = atom<{ overlay?: () => void }>({});
