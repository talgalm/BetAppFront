import { ReactComponent as ConnectionErrorIcon } from '@assets/icons/errorIcons/ConnectionError.svg';
import { ReactComponent as FileNotSupportedIcon } from '@assets/icons/errorIcons/FileNotSupported.svg';
import { ReactComponent as FileTooBigIcon } from '@assets/icons/errorIcons/FileTooBig.svg';
import { ReactComponent as NotEnoughBetimIcon } from '@assets/icons/errorIcons/NotEnoughBetim.svg';
import { ReactComponent as OverlappingParticipantsIcon } from '@assets/icons/errorIcons/OverlappingParticipants.svg';
import { ReactComponent as AuthErrorIcon } from '@assets/icons/errorIcons/AuthError.svg';

export enum ErrorTypes {
  ConnectionError = 'ConnectionError',
  NotEnoughBetim = 'NotEnoughBetim',
  FileNotSupported = 'FileNotSupported',
  FileTooBig = 'FileTooBig',
  OverlappingParticipants = 'OverlappingParticipants',
  AtLeastTwoParticipants = 'AtLeastTwoParticipants',
  AuthError = 'AuthError',
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
    title: 'יש לבחור משתתף אחר',
    subtitle: 'האחראי לא יכול להיות משתתף בהתערבות, נא לבחור משתתף אחר.',
    buttonText: 'בחר משתתף אחר',
  },
  [ErrorTypes.AuthError]: {
    icon: AuthErrorIcon,
    title: 'יש להתחבר מחדש',
    subtitle: 'עבר יותר מידי זמן מאז שהתראינו בפעם האחרונה',
    buttonText: 'התחבר מחדש',
  },
  [ErrorTypes.AtLeastTwoParticipants]: {
    icon: OverlappingParticipantsIcon,
    title: 'יש לבחור לפחות משתתף אחד',
    subtitle: 'נא לבחור לפחות משתתף אחד כדי להמשיך.',
    buttonText: 'בחר משתתף',
  },
};
