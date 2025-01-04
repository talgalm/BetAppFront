import { atomWithStorage } from "jotai/utils";
import { Group, User } from "../api/interfaces";
import { HeaderStyle } from "../Theme/ThemeInterfaces";

export const layoutAtom = atomWithStorage<{ headerStyle: HeaderStyle }>(
  "userAtom",
  { headerStyle: HeaderStyle.PRIMARY_EXPAND } 
);

export const userAtom = atomWithStorage<User>("userAtom", {
  username: "",
});

export const groupAtom = atomWithStorage<Group>("groupAtom", {
  groupId: "",
  groupName: "",
  users: [],
});
