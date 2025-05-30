import { atomWithStorage } from 'jotai/utils';
import { HeaderStyle } from '../Theme/ThemeInterfaces';
import { atom } from 'jotai';

export const layoutAtom = atomWithStorage<{
  headerStyle: HeaderStyle;
}>('layoutAtom', {
  headerStyle: HeaderStyle.PRIMARY,
});

export const headerAtom = atom<HeaderStyle>(HeaderStyle.PRIMARY);

export const layoutEphemeralAtom = atom<{ overlay?: () => void }>({});

export const finishBetAtom = atom<boolean | null>(null);

export const betWinnerAtom = atom<string[]>([]);
