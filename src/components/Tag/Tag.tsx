import React from 'react';
import styled from 'styled-components';
import { TagType } from '../../api/interfaces';
import { TagStyles } from './TagStyles';
import { Typography } from '../Topography/topography';
import { TypographyTypes } from '../../Theme/Typography/typography';

interface TagProps {
  value: string;
  type: TagType;
  participants?: number;
}

const TagWrapper = styled.div<{ type: TagType }>`
  ${({ type }: { type: TagType }) => TagStyles[type]}
`;

const Tag: React.FC<TagProps> = ({ value, type, participants }) => {
  return (
    <div style={{ direction: 'rtl', textAlign: 'right' }}>
      <TagWrapper type={type}>
        <Typography
          value={participants ? `${participants} משתתפים` : value}
          variant={TypographyTypes.H7}
        />
      </TagWrapper>
    </div>
  );
};

export default Tag;
