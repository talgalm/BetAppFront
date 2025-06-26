import { atom } from 'jotai';
import { DialogAction } from '@components/StyledDialog/StyledDialog';

export const dialogActionAtom = atom<DialogAction | null>(null);
export const contactModalDialogAtom = atom<boolean | null>(null);
