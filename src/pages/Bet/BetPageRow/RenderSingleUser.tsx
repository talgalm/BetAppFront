import React from 'react';
import { User } from '../../../Interfaces';
import { UserSingleRow } from './BetPageRow.styles';
import { SmallAvatar } from '../BetPage.styles';
import { Typography } from '../../../components/Topography/topography';
import { TypographyTypes } from '../../../components/Topography/TypographyTypes';

const RenderSingleUser: React.FC<{ user: User }> = ({ user }) => {
  return (
    <UserSingleRow>
      <SmallAvatar>{user.fullName?.charAt(0)}</SmallAvatar>
      <Typography
        value={user.fullName}
        variant={TypographyTypes.TextMedium}
        styleProps={{ color: 'black' }}
      />
    </UserSingleRow>
  );
};

export default RenderSingleUser;
