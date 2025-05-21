import React, { useState } from 'react';
import { Typography } from '../../../components/Topography/topography';
import { TypographyTypes } from '../../../components/Topography/TypographyTypes';
import { Prediction, User } from '../../../Interfaces';
import { StyledDivider, SummaryRow } from '../../NewBet/NewBetComponents/Summary/Summary.styles';
import { AvatarRow, Column, RotatingArrow, Row, SmallAvatar } from '../BetPage.styles';
import { isArray } from 'lodash';
import { ReactComponent as ArrowIcon } from '../../../Theme/Icons/Bet/Arrow.svg';

interface FieldRowProps {
  label: string;
  value?: string | number | null;
  background?: string;
  icon?: React.ElementType;
  arrValue?: Prediction[] | User;
  currentUser?: User;
  isOpen: boolean;
  onToggle: () => void;
}

const FieldRow: React.FC<FieldRowProps> = ({
  label,
  value = '',
  background,
  icon: Icon,
  arrValue,
  currentUser,
  isOpen,
  onToggle,
}) => {
  const renderUserList = () => {
    if (!isArray(arrValue)) return null;

    const sorted = [...arrValue].sort((a, b) => {
      if (!currentUser) return 0;
      if (a.userId === currentUser.id) return -1;
      if (b.userId === currentUser.id) return 1;
      return 0;
    });

    return (
      <AvatarRow isOpen={isOpen}>
        {sorted.map((participant) => (
          <div
            key={participant.userId}
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              gap: isOpen ? 6 : 0,
              overflow: 'hidden',
              transition: 'all 0.5s ease',
              maxHeight: 30,
            }}
          >
            <SmallAvatar status={participant.approved ?? 'pending'}>
              {participant.fullName?.charAt(0)}
            </SmallAvatar>

            <div
              style={{
                opacity: isOpen ? 1 : 0,
                maxWidth: isOpen ? 150 : 0,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                transition: 'opacity 0.5s ease, max-width 0.5s ease',
              }}
            >
              <Typography
                value={participant.fullName}
                variant={TypographyTypes.TextMedium}
                styleProps={{ color: 'black' }}
              />
            </div>
          </div>
        ))}
      </AvatarRow>
    );
  };

  const renderSingleUser = () => {
    if (isArray(arrValue) || !arrValue) return null;

    return (
      <div style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
        <SmallAvatar>{arrValue.fullName?.charAt(0)}</SmallAvatar>
        <Typography
          value={arrValue.fullName}
          variant={TypographyTypes.TextMedium}
          styleProps={{ color: 'black' }}
        />
      </div>
    );
  };

  if (!value && !arrValue) return null;

  return (
    <>
      <Row onClick={onToggle} style={{ cursor: 'pointer' }}>
        <Column>
          <Typography value={label} variant={TypographyTypes.H3} styleProps={{ color: 'black' }} />
          {background ? (
            <SummaryRow background={background}>
              {value && (
                <Typography
                  value={value}
                  variant={TypographyTypes.TextMedium}
                  styleProps={{ color: 'black' }}
                />
              )}
              {Icon && <Icon width={18} height={18} />}
            </SummaryRow>
          ) : (
            <>
              {value && (
                <Typography value={value} variant={TypographyTypes.TextMedium} truncate={!isOpen} />
              )}
              {renderSingleUser()}
            </>
          )}
          {renderUserList()}
        </Column>
        <RotatingArrow open={isOpen} />
      </Row>
      <StyledDivider />
    </>
  );
};

export default FieldRow;
