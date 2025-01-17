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
import { useTranslation } from "react-i18next";
import { ReactComponent as AddPeopleIcon } from "../../Theme/Icons/AddPeopleIcon.svg";


const MyGroups = (): JSX.Element => {
  const [groups] = useState<Group[]>(talsGroups);
  const [isExpanded, setIsExpanded] = useState(false);
    const { t } = useTranslation();
  

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <MainContainer>
      <InputWrapper>
        <Typography value={t("MyGroups.title")} variant={TypographyTypes.H3} />
        <AddPeopleIcon />
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
            value={isExpanded ? t("MyGroups.showMore") : t("MyGroups.showless")}
            variant={TypographyTypes.H4}
          />
        </ShowMeMore>
      )}
    </MainContainer>
  );
};

export default MyGroups;
