import { Group, TagText, TagType } from "../../api/interfaces";
import Tag from "../../components/Tag/Tag";
import { Typography } from "../../components/Topography/topography";
import { TypographyTypes } from "../../Theme/Typography/typography";
import { AvatarsDiv, BetRow, DescriptionDiv, RightDiv } from "./SingleGroup.styles";

interface SinglegGroupProp {
  group: Group;
}

const SingleGroup = ({ group }: SinglegGroupProp): JSX.Element => {
  return (
    <BetRow>
      <RightDiv>
        <AvatarsDiv>{}</AvatarsDiv>
        <DescriptionDiv>
          <Typography value={group.groupName} variant={TypographyTypes.H4} />
          <Typography
            value={`נפתח ב: ${group.createdAt}`}
            variant={TypographyTypes.H5}
          />
        </DescriptionDiv>
      </RightDiv>
      <Tag
        value={TagText[TagType.PARTICIPANTS]}
        type={TagType.PARTICIPANTS}
        participants={12}
      />
    </BetRow>
  );
};

export default SingleGroup;
