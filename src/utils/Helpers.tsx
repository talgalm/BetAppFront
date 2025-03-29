import { useAtom } from 'jotai';
import { layoutAtom } from '../Jotai/atoms';
import { HeaderStyle } from '../Theme/ThemeInterfaces';

export const useIsPrimaryExpand = (): boolean => {
  const [layout] = useAtom(layoutAtom);
  return layout.headerStyle === HeaderStyle.PRIMARY_EXPAND;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};
