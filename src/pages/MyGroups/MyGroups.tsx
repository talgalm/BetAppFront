import { useState } from 'react';
import { Typography } from '../../components/Topography/topography';
import { TypographyTypes } from '../../Theme/Typography/typography';

import { Group } from '../../api/interfaces';
import {
  GroupsContainer,
  GrayLine,
  InputWrapper,
  MainContainer,
  ShowMeMore,
  CollapsibleContainer,
} from './MyGroup.styles';
import SingleGroup from '../SingleGroup/SingleGroup';
import { Collapse } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ReactComponent as AddPeopleIcon } from '../../Theme/Icons/AddPeopleIcon.svg';

interface MyGroupsProps {
  userGroups: Group[];
}

const MyGroups = ({ userGroups }: MyGroupsProps): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(false);
  // const [username] = useState('TalG');

  const { t } = useTranslation();

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <MainContainer>
      <InputWrapper>
        <Typography value={t('MyGroups.title')} variant={TypographyTypes.H3} />
        <AddPeopleIcon />
      </InputWrapper>
      <GrayLine />
      <CollapsibleContainer>
        <GroupsContainer>
          {userGroups &&
            userGroups.slice(0, 4).map((group, index) => <SingleGroup group={group} key={index} />)}
        </GroupsContainer>
        <Collapse in={isExpanded}>
          <GroupsContainer>
            {userGroups &&
              userGroups
                .slice(4)
                .map((group, index) => <SingleGroup group={group} key={index + 4} />)}
          </GroupsContainer>
        </Collapse>
      </CollapsibleContainer>
      {userGroups && userGroups.length > 4 && (
        <ShowMeMore onClick={toggleExpand}>
          <Typography
            value={isExpanded ? t('MyGroups.showMore') : t('MyGroups.showless')}
            variant={TypographyTypes.H4}
          />
        </ShowMeMore>
      )}
    </MainContainer>
  );
};

export default MyGroups;
