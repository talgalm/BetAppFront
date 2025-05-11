import { useAtom } from 'jotai';
import { layoutAtom } from '../Jotai/atoms';
import { HeaderStyle } from '../Theme/ThemeInterfaces';

export const useIsPrimaryExpand = (): boolean => {
  const [layout] = useAtom(layoutAtom);
  return layout.headerStyle === HeaderStyle.PRIMARY;
};

export const formatDate = (dateString: string | Date | undefined): string => {
  if (dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }
  return '';
};

export const formatPhoneNumber = (number: string | undefined): string => {
  if (!number || number.length !== 10) return '';
  return `${number.slice(0, 3)}-${number.slice(3)}`;
};
