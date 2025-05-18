import { BetStatus } from '../../Interfaces';
import { TagStyled } from '../../pages/Home/SingleBetRow.styles';
import { Typography } from '../Topography/topography';
import { TypographyTypes } from '../Topography/TypographyTypes';

export enum TagType {
  PENDING_APPROVAL = 'ממתין לאישור',
  SUPERVISOR = 'מפקח',
  ACTIVE = 'פעיל',
  COMPLETED = 'הסתיים',
  PENDING_DECISION = 'ממתין להכרעה',
  CANCELED = 'בוטלה',
}

export const betStatusToTagType: Record<BetStatus, TagType> = {
  [BetStatus.ACTIVE]: TagType.ACTIVE,
  [BetStatus.CANCELED]: TagType.CANCELED,
  [BetStatus.COMPLETED]: TagType.COMPLETED,
  [BetStatus.PENDING]: TagType.PENDING_APPROVAL,
  [BetStatus.PENDING_DECISION]: TagType.PENDING_DECISION,
};

export const TagTypeColors: Record<keyof typeof TagType, { background: string; accent: string }> = {
  PENDING_APPROVAL: {
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
  CANCELED: {
    background: '#E33E214f',
    accent: '#E33E21',
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
