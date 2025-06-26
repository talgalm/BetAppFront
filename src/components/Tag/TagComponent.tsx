import { BetStatus } from '@interfaces/Bet.interface';
import { TagStyled } from '@pages/home/SingleBetRow.styles';
import { Typography } from '../Topography/typography';
import { TypographyTypes } from '../Topography/TypographyTypes';
import { TAG_COLORS } from '@theme/colorTheme';

export enum TagType {
  DRAFT = 'דראפט',
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
  [BetStatus.DRAFT]: TagType.DRAFT,
  [BetStatus.ACTIVE]: TagType.ACTIVE,
  [BetStatus.CANCELED]: TagType.CANCELED,
  [BetStatus.COMPLETED]: TagType.COMPLETED,
  [BetStatus.PENDING]: TagType.PENDING_APPROVAL,
  [BetStatus.PENDING_DECISION]: TagType.PENDING_DECISION,
  [BetStatus.FINAL_DECISION_PENDING]: TagType.FINAL_DECISION_PENDING,
  [BetStatus.PENDING_CREATOR]: TagType.FINAL_DECISION_PENDING,
  [BetStatus.PENDING_SUPERVISOR]: TagType.FINAL_DECISION_PENDING,
};

export const TagTypeColors: Record<keyof typeof TagType, { background: string; accent: string }> = {
  PENDING_APPROVAL: {
    background: TAG_COLORS.ORANGE_BACKGROUND,
    accent: TAG_COLORS.ORANGE_ACCENT,
  },
  PENDING_APPROVAL_REST: {
    background: TAG_COLORS.ORANGE_BACKGROUND,
    accent: TAG_COLORS.ORANGE_ACCENT,
  },
  SUPERVISOR: {
    background: TAG_COLORS.YELLOW_BACKGROUND,
    accent: TAG_COLORS.YELLOW_ACCENT,
  },
  ACTIVE: {
    background: TAG_COLORS.GREEN_BACKGROUND,
    accent: TAG_COLORS.GREEN_ACCENT,
  },
  COMPLETED: {
    background: TAG_COLORS.BLUE_BACKGROUND,
    accent: TAG_COLORS.BLUE_ACCENT,
  },
  PENDING_DECISION: {
    background: TAG_COLORS.ORANGE_BACKGROUND,
    accent: TAG_COLORS.ORANGE_ACCENT,
  },
  FINAL_DECISION_PENDING: {
    background: TAG_COLORS.ORANGE_BACKGROUND,
    accent: TAG_COLORS.ORANGE_ACCENT,
  },
  CANCELED: {
    background: TAG_COLORS.PINK_BACKGROUND,
    accent: TAG_COLORS.PINK_ACCENT,
  },
  DRAFT: {
    background: TAG_COLORS.PINK_BACKGROUND,
    accent: TAG_COLORS.PINK_ACCENT,
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
