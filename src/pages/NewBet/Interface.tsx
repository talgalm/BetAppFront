import { User } from '../../api/interfaces';
import { ReactComponent as CalendarIcon } from '../../Theme/Icons/CalendarIcon.svg';
import { ReactComponent as BetimIcon } from '../../Theme/Icons/Betim.svg';

export enum NewBetStepValueTypes {
  Start = 'Start',
  Name = 'Name',
  Description = 'Description',
  Coins = 'Coins',
  Deadline = 'Deadline',
  Participants = 'Participants',
  Conditions = 'Conditions',
  Files = 'Files',
  Supervisor = 'Supervisor',
  Summary = 'Summary',
}

export interface NewBetStep {
  step: NewBetStepValueTypes;
  prevButton: NewBetStepValueTypes | null;
  continueButton: NewBetStepValueTypes | null;
  continueButtonText?: string;
  continuteWithout?: boolean;
  continuteWithoutIcon?: React.ReactNode;
  inputName?: NewBetStepValueTypes;
  skipToEnd?: boolean;
  progress?: number;
}

export const newBetSteps: Record<NewBetStepValueTypes, NewBetStep> = {
  [NewBetStepValueTypes.Start]: {
    step: NewBetStepValueTypes.Start,
    inputName: NewBetStepValueTypes.Start,
    continueButton: NewBetStepValueTypes.Name,
    continueButtonText: 'NewBet.startNewBet',
    prevButton: null,
  },
  [NewBetStepValueTypes.Name]: {
    step: NewBetStepValueTypes.Name,
    inputName: NewBetStepValueTypes.Name,
    continueButton: NewBetStepValueTypes.Participants,
    prevButton: NewBetStepValueTypes.Start,
  },
  [NewBetStepValueTypes.Participants]: {
    inputName: NewBetStepValueTypes.Participants,
    step: NewBetStepValueTypes.Participants,
    continueButton: NewBetStepValueTypes.Description,
    prevButton: NewBetStepValueTypes.Name,
  },
  [NewBetStepValueTypes.Description]: {
    step: NewBetStepValueTypes.Description,
    inputName: NewBetStepValueTypes.Description,
    continueButton: NewBetStepValueTypes.Coins,
    prevButton: NewBetStepValueTypes.Participants,
  },
  [NewBetStepValueTypes.Conditions]: {
    inputName: NewBetStepValueTypes.Conditions,
    step: NewBetStepValueTypes.Conditions,
    continueButton: NewBetStepValueTypes.Coins,
    continuteWithout: false,
    prevButton: NewBetStepValueTypes.Description,
  },
  [NewBetStepValueTypes.Coins]: {
    step: NewBetStepValueTypes.Coins,
    inputName: NewBetStepValueTypes.Coins,
    continueButton: NewBetStepValueTypes.Deadline,
    continuteWithout: true,
    continuteWithoutIcon: <BetimIcon width={24} height={24} />,
    prevButton: NewBetStepValueTypes.Description,
  },
  [NewBetStepValueTypes.Deadline]: {
    step: NewBetStepValueTypes.Deadline,
    inputName: NewBetStepValueTypes.Deadline,
    continueButton: NewBetStepValueTypes.Files,
    continuteWithout: true,
    continuteWithoutIcon: <CalendarIcon color="#15AB94" />,
    prevButton: NewBetStepValueTypes.Coins,
  },
  [NewBetStepValueTypes.Files]: {
    inputName: NewBetStepValueTypes.Files,
    step: NewBetStepValueTypes.Files,
    continueButton: NewBetStepValueTypes.Supervisor,
    prevButton: NewBetStepValueTypes.Deadline,
  },
  [NewBetStepValueTypes.Supervisor]: {
    inputName: NewBetStepValueTypes.Supervisor,
    step: NewBetStepValueTypes.Supervisor,
    continueButton: NewBetStepValueTypes.Summary,
    prevButton: NewBetStepValueTypes.Files,
  },
  [NewBetStepValueTypes.Summary]: {
    inputName: NewBetStepValueTypes.Summary,
    step: NewBetStepValueTypes.Summary,
    continueButton: null,
    continueButtonText: 'NewBet.createBet',
    prevButton: NewBetStepValueTypes.Supervisor,
  },
};

export type CreateBetInputs = {
  Start?: string;
  Name: string;
  Description?: string;
  Coins: number;
  Deadline?: Date;
  Participants?: User[];
  Conditions?: Guess[];
  Files?: File[];
  Supervisor?: User[];
  Summary?: string;
};

export type Guess = {
  userId: string;
  text?: string;
  date?: Date;
};
