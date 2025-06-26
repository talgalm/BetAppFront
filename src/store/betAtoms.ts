import { atom } from 'jotai';

export interface FinishBetState {
  isFinished: boolean;
  mode: 'single' | 'multi';
}

export const finishBetAtom = atom<FinishBetState | null>(null);
export const betWinnerAtom = atom<string[]>([]);
