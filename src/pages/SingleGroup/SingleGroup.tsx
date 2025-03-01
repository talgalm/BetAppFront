import { useTranslation } from 'react-i18next';
import { Group, TagText, TagType } from '../../api/interfaces';
import Tag from '../../components/Tag/Tag';
import { Typography } from '../../components/Topography/topography';
import { TypographyTypes } from '../../Theme/Typography/typography';
import { AvatarsDiv, BetRow, DescriptionDiv, RightDiv } from './SingleGroup.styles';
import { format } from 'date-fns';

interface SinglegGroupProp {
  group: Group;
}

const SingleGroup = ({ group }: SinglegGroupProp): JSX.Element => {
  const { t } = useTranslation();
  return (
    <BetRow>
      <RightDiv>
        <AvatarsDiv>{}</AvatarsDiv>
        <DescriptionDiv>
          <Typography value={group.name} variant={TypographyTypes.H4} />
          <Typography
            value={`${t('MyGroups.createdAT')} ${group.createdAt ? format(new Date(group.createdAt), 'dd/MM/yyyy') : t('MyGroups.unknownDate')}`}
            variant={TypographyTypes.H5}
          />
        </DescriptionDiv>
      </RightDiv>
      <Tag
        value={TagText[TagType.PARTICIPANTS]}
        type={TagType.PARTICIPANTS}
        participants={group.users?.length + 1 || 0}
      />
    </BetRow>
  );
};

export default SingleGroup;
