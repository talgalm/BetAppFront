import { atomWithStorage } from 'jotai/utils';
import { HeaderStyle } from '../Theme/ThemeInterfaces';
import { atom } from 'jotai';
import { DialogAction } from '@components/StyledDialog/StyledDialog';

export const layoutAtom = atomWithStorage<{
  headerStyle: HeaderStyle;
}>('layoutAtom', {
  headerStyle: HeaderStyle.PRIMARY,
});

export const headerAtom = atom<HeaderStyle>(HeaderStyle.PRIMARY);

export const layoutEphemeralAtom = atom<{ overlay?: () => void }>({});

export interface FinishBetState {
  isFinished: boolean;
  mode: 'single' | 'multi';
}

export const finishBetAtom = atom<FinishBetState | null>(null);

export const betWinnerAtom = atom<string[]>([]);

export const dialogActionAtom = atom<DialogAction | null>(null);

export const contactModalDialogAtom = atom<boolean | null>(null);
