import { useState } from "react";
import { Typography } from "../../components/Topography/topography";
import { TypographyTypes } from "../../Theme/Typography/typography";

import { Group } from "../../api/interfaces";
import {
  GroupsContainer,
  GrayLine,
  InputWrapper,
  MainContainer,
  ShowMeMore,
  CollapsibleContainer,
} from "./MyGroup.styles";
import SingleGroup from "../SingleGroup/SingleGroup";
import { talsGroups } from "../../Mocks/groupsMock";
import { Collapse } from "@mui/material";

const MyGroups = (): JSX.Element => {
  const [groups] = useState<Group[]>(talsGroups);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <MainContainer>
      <InputWrapper>
        <Typography value={"קבוצות"} variant={TypographyTypes.H3} />
      </InputWrapper>
      <GrayLine />
      <CollapsibleContainer>
        <GroupsContainer>
          {groups.slice(0, 4).map((group, index) => (
            <SingleGroup group={group} key={index} />
          ))}
        </GroupsContainer>
        <Collapse in={isExpanded}>
          <GroupsContainer>
            {groups.slice(4).map((group, index) => (
              <SingleGroup group={group} key={index + 4} />
            ))}
          </GroupsContainer>
        </Collapse>
      </CollapsibleContainer>
      {groups.length > 4 && (
        <ShowMeMore onClick={toggleExpand}>
          <Typography
            value={isExpanded ? "הצג פחות" : "תראה לי עוד"}
            variant={TypographyTypes.H4}
          />
        </ShowMeMore>
      )}
    </MainContainer>
  );
};

export default MyGroups;