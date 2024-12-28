import { atomWithStorage } from "jotai/utils";
import { Group, User } from "../api/interfaces";

export const userAtom = atomWithStorage<User>("userAtom", {
    username: "",
});

export const groupAtom = atomWithStorage<Group>("groupAtom", {
  groupId: "",
  groupName: "",
  users: [],
});
