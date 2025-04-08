import { ReactComponent as ConnectionErrorIcon } from '../Theme/Icons/ErrorIcons/ConnectionError.svg';
import { ReactComponent as FileNotSupportedIcon } from '../Theme/Icons/ErrorIcons/FileNotSupported.svg';
import { ReactComponent as FileTooBigIcon } from '../Theme/Icons/ErrorIcons/FileTooBig.svg';
import { ReactComponent as NotEnoughBetimIcon } from '../Theme/Icons/ErrorIcons/NotEnoughBetim.svg';
import { ReactComponent as OverlappingParticipantsIcon } from '../Theme/Icons/ErrorIcons/OverlappingParticipants.svg';

export enum ErrorTypes {
  ConnectionError = 'ConnectionError',
  NotEnoughBetim = 'NotEnoughBetim',
  FileNotSupported = 'FileNotSupported',
  FileTooBig = 'FileTooBig',
  OverlappingParticipants = 'OverlappingParticipants',
}

export interface ErrorMessage {
  title: string;
  subtitle: string;
  buttonText: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const ERROR_MESSAGES: Record<ErrorTypes, ErrorMessage> = {
  [ErrorTypes.ConnectionError]: {
    icon: ConnectionErrorIcon,
    title: 'אין חיבור לאינטרנט',
    subtitle: 'בעיה בחיבור האינטרנט, הנתונים נשמרו, נא לנסות שוב לאחר חידוש החיבור.',
    buttonText: 'טעינה מחדש',
  },
  [ErrorTypes.NotEnoughBetim]: {
    icon: NotEnoughBetimIcon,
    title: 'חסר בטים בארנק',
    subtitle: 'אין לך מספיק בטים, נא להטעין את החשבון.',
    buttonText: 'קניית בטים',
  },
  [ErrorTypes.FileNotSupported]: {
    icon: FileNotSupportedIcon,
    title: 'עדיין לא תומכים בפורמט הזה',
    subtitle: 'פורמט הקובץ אינו נתמך, נא לבחור קובץ בפורמט מתאים.',
    buttonText: 'בחר קובץ אחר',
  },
  [ErrorTypes.FileTooBig]: {
    icon: FileTooBigIcon,
    title: 'הקובץ יותר מידי גדול',
    subtitle: 'הקובץ חורג מהגודל המותר (25MB) נא לבחור קובץ אחר.',
    buttonText: 'בחר קובץ אחר',
  },
  [ErrorTypes.OverlappingParticipants]: {
    icon: OverlappingParticipantsIcon,
    title: 'יש לבחור בן אדם אחר',
    subtitle: 'האחראי לא יכול להיות משתתף בהתערבות, נא לבחור אדם אחר.',
    buttonText: 'בחר בן אדם אחר',
  },
};
