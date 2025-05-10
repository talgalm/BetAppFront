import { User } from '../../Interfaces';
import { ReactComponent as CalendarIcon } from '../../Theme/Icons/CalendarIcon.svg';
import { ReactComponent as BetimIcon } from '../../Theme/Icons/Betim.svg';

export enum NewBetStepValueTypes {
  Start = 'Start',
  name = 'name',
  description = 'description',
  betim = 'betim',
  deadline = 'deadline',
  participants = 'participants',
  Conditions = 'Conditions',
  files = 'files',
  supervisor = 'supervisor',
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
    continueButton: NewBetStepValueTypes.name,
    continueButtonText: 'NewBet.startNewBet',
    prevButton: null,
  },
  [NewBetStepValueTypes.name]: {
    step: NewBetStepValueTypes.name,
    inputName: NewBetStepValueTypes.name,
    continueButton: NewBetStepValueTypes.participants,
    prevButton: NewBetStepValueTypes.Start,
  },
  [NewBetStepValueTypes.participants]: {
    inputName: NewBetStepValueTypes.participants,
    step: NewBetStepValueTypes.participants,
    continueButton: NewBetStepValueTypes.description,
    prevButton: NewBetStepValueTypes.name,
  },
  [NewBetStepValueTypes.description]: {
    step: NewBetStepValueTypes.description,
    inputName: NewBetStepValueTypes.description,
    continueButton: NewBetStepValueTypes.betim,
    prevButton: NewBetStepValueTypes.participants,
  },
  [NewBetStepValueTypes.Conditions]: {
    inputName: NewBetStepValueTypes.participants,
    step: NewBetStepValueTypes.Conditions,
    continueButton: NewBetStepValueTypes.betim,
    continuteWithout: false,
    prevButton: NewBetStepValueTypes.description,
  },
  [NewBetStepValueTypes.betim]: {
    step: NewBetStepValueTypes.betim,
    inputName: NewBetStepValueTypes.betim,
    continueButton: NewBetStepValueTypes.deadline,
    continuteWithout: true,
    continuteWithoutIcon: <BetimIcon width={24} height={24} />,
    prevButton: NewBetStepValueTypes.description,
  },
  [NewBetStepValueTypes.deadline]: {
    step: NewBetStepValueTypes.deadline,
    inputName: NewBetStepValueTypes.deadline,
    continueButton: NewBetStepValueTypes.files,
    continuteWithout: true,
    continuteWithoutIcon: <CalendarIcon color="#15AB94" />,
    prevButton: NewBetStepValueTypes.betim,
  },
  [NewBetStepValueTypes.files]: {
    inputName: NewBetStepValueTypes.files,
    step: NewBetStepValueTypes.files,
    continueButton: NewBetStepValueTypes.supervisor,
    prevButton: NewBetStepValueTypes.deadline,
  },
  [NewBetStepValueTypes.supervisor]: {
    inputName: NewBetStepValueTypes.supervisor,
    step: NewBetStepValueTypes.supervisor,
    continueButton: NewBetStepValueTypes.Summary,
    prevButton: NewBetStepValueTypes.files,
  },
  [NewBetStepValueTypes.Summary]: {
    inputName: NewBetStepValueTypes.Summary,
    step: NewBetStepValueTypes.Summary,
    continueButton: null,
    continueButtonText: 'NewBet.createBet',
    prevButton: NewBetStepValueTypes.supervisor,
  },
};

export type CreateBetInputs = {
  Start?: string;
  name: string;
  description?: string;
  betim: number;
  deadline?: Date;
  participants?: Participant[];
  Conditions?: any;
  files?: File[];
  supervisor?: User[];
  Summary?: string;
};

export type Participant = {
  id?: string;
  fullName?: string;
  phoneNumber: string;
  guess?: string;
  date?: Date;
  approved?: boolean;
};
