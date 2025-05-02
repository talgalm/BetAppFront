export interface User {
  id: string;
  fullName?: string;
  image?: File;
  password?: string;
  email?: string;
  phoneNumber?: string;
  betim?: number;
  bets?: Bet[];
  verifyEmail?: boolean;
}

export interface Bet {
  name: string;
  createdAt: string;
  groupName?: string;
  userGuesses: User[];
}
