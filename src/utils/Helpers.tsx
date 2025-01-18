import { useAtom } from "jotai";
import { layoutAtom } from "../Jotai/atoms";
import { HeaderStyle } from "../Theme/ThemeInterfaces";

export const useIsPrimaryExpand = (): boolean => {
  const [layout] = useAtom(layoutAtom);
  return layout.headerStyle === HeaderStyle.PRIMARY_EXPAND;
};

export const useDateFormat = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};
