import { BetStatus } from '../../Interfaces';
import { TagStyled } from '../../pages/Home/SingleBetRow.styles';
import { Typography } from '../Topography/topography';
import { TypographyTypes } from '../Topography/TypographyTypes';

export enum TagType {
  PENDING_APPROVAL = 'ממתין לאישור',
  PENDING_APPROVAL_REST = 'ממתין לאישור שאר משתתפים',
  SUPERVISOR = 'מפקח',
  ACTIVE = 'פעיל',
  COMPLETED = 'הסתיים',
  PENDING_DECISION = 'ממתין להכרעה',
  CANCELED = 'בוטלה',
  FINAL_DECISION_PENDING = 'ממתין להכרעה סופית',
}

export const betStatusToTagType: Record<BetStatus, TagType> = {
  [BetStatus.ACTIVE]: TagType.ACTIVE,
  [BetStatus.CANCELED]: TagType.CANCELED,
  [BetStatus.COMPLETED]: TagType.COMPLETED,
  [BetStatus.PENDING]: TagType.PENDING_APPROVAL,
  [BetStatus.PENDING_DECISION]: TagType.PENDING_DECISION,
  [BetStatus.FINAL_DECISION_PENDING]: TagType.FINAL_DECISION_PENDING,
};

export const TagTypeColors: Record<keyof typeof TagType, { background: string; accent: string }> = {
  PENDING_APPROVAL: {
    background: '#FFEED6',
    accent: '#D87330',
  },
  PENDING_APPROVAL_REST: {
    background: '#FFEED6',
    accent: '#D87330',
  },
  SUPERVISOR: {
    background: '#FFFAB8',
    accent: '#9E6C00',
  },
  ACTIVE: {
    background: '#DEF7F9',
    accent: '#0F7C98',
  },
  COMPLETED: {
    background: '#EDF2FE',
    accent: '#3758C7',
  },
  PENDING_DECISION: {
    background: '#FFEED6',
    accent: '#D87330',
  },
  FINAL_DECISION_PENDING: {
    background: '#FFEED6',
    accent: '#D87330',
  },
  CANCELED: {
    background: '#FFE9F0',
    accent: '#CA1A61',
  },
};

interface TagProps {
  type?: TagType;
}

const Tag = ({ type = TagType.COMPLETED }: TagProps) => {
  const key = Object.keys(TagType).find(
    (k) => TagType[k as keyof typeof TagType] === type
  ) as keyof typeof TagType;

  const { background, accent } = TagTypeColors[key];

  return (
    <TagStyled background={background}>
      <Typography value={type} variant={TypographyTypes.VerySmall} styleProps={{ color: accent }} />
    </TagStyled>
  );
};

export default Tag;
