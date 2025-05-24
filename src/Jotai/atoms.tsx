import { atomWithStorage } from 'jotai/utils';
import { FooterStyle, HeaderStyle } from '../Theme/ThemeInterfaces';
import { atom } from 'jotai';
import { Prediction } from '../Interfaces';

export const layoutAtom = atomWithStorage<{
  headerStyle: HeaderStyle;
  footerStyle: FooterStyle;
}>('layoutAtom', {
  headerStyle: HeaderStyle.PRIMARY,
  footerStyle: FooterStyle.SHOW,
});

export const layoutEphemeralAtom = atom<{ overlay?: () => void }>({});

export const finishBetAtom = atom<boolean | null>(null);

export const betWinnerAtom = atom<Prediction | null>(null);
