import { Bet, TagType } from "../api/interfaces";
import { dror, galmors } from "./groupsMock";
import { user1, user4, user5 } from "./usersMock";

export const bet1: Bet = {
  name: "התערבות מספר 1",
  createdAt: "12/12/2024",
  group: galmors,
  risk: TagType.LOW,
};

export const bet2: Bet = {
  name: "התערבות מספר 2",
  createdAt: "12/12/2024",
  group: galmors,
  risk: TagType.MID,
};

export const bet3: Bet = {
  name: "האם תומר הומו ?",
  createdAt: "12/12/2024",
  group: dror,
  risk: TagType.HIGH,
};

export const bet4: Bet = {
  name: "מתי דולב יתחתן ?",
  createdAt: "01/11/2024",
  group: dror,
  risk: TagType.HIGH,
};

export const bet5: Bet = {
  name: "התערבות על יניר ",
  createdAt: "01/11/2024",
  participants: [user1, user4, user5],
  risk: TagType.HIGH,
};

export const talsBets: Bet[] = [bet1, bet2, bet3, bet5];