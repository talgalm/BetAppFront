import { BetFile } from '../../../interfaces/Bet.interface';
import { Prediction, ParticipantStatus } from '../../../interfaces/Prediction.interface';
import { User } from '../../../interfaces/User.interface';

export interface FieldRowProps {
  label: string;
  value?: string | number | null;
  background?: string;
  icon?: React.ElementType;
  arrValue?: Prediction[] | (User & { status?: ParticipantStatus });
  disclaimer?: string;
  files?: BetFile[];
  currentUser?: User;
  isOpen: boolean;
  onToggle: () => void;
}
