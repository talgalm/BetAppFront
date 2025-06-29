import React from 'react';
import { SmallAvatar } from '../BetPage.styles';
import { Typography } from '@components/Topography/typography';
import { TypographyTypes } from '@components/Topography/TypographyTypes';
import { useParams } from 'react-router-dom';
import { useBet } from '../hooks/useBet';
import { User } from '@interfaces/User.interface';
import { UserSingleRow } from './BetPageRow.styles';
import { PRIMARY_BLACK } from '@theme/colorTheme';

const ParticipentsBet: React.FC<{ user: User }> = ({ user }) => {
  const { id } = useParams();
  const { data: bet } = useBet(id);
  return (
    <UserSingleRow>
      <SmallAvatar status={bet?.supervisor?.status}>{user.fullName?.charAt(0)}</SmallAvatar>
      <Typography
        value={user.fullName}
        variant={TypographyTypes.TextMedium}
        styleProps={{ color: PRIMARY_BLACK }}
      />
    </UserSingleRow>
  );
};

export default ParticipentsBet;
