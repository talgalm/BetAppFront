import { useAtom } from "jotai";
import { layoutAtom } from "../Jotai/atoms";
import { HeaderStyle } from "../Theme/ThemeInterfaces";


export const isPrimaryExpand = (): boolean => {
  const [layout] = useAtom(layoutAtom);
  return layout.headerStyle === HeaderStyle.PRIMARY_EXPAND;
};