import { ParticipantStatus, Prediction, User } from '../../../Interfaces';

export interface FieldRowProps {
  label: string;
  value?: string | number | null;
  background?: string;
  icon?: React.ElementType;
  arrValue?: Prediction[] | (User & { status?: ParticipantStatus });
  disclaimer?: string;
  currentUser?: User;
  isOpen: boolean;
  onToggle: () => void;
}
