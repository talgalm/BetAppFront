import React from 'react';
import { useTranslation } from 'react-i18next';
import { isArray } from 'lodash';
import { FieldRowProps } from './types';
import RenderUserList from './RenderUserList';
import RenderSingleUser from './RenderSingleUser';
import { Row, Column, RotatingArrow, DisclaimerWrapper } from '../BetPage.styles';
import { SummaryRow, StyledDivider } from '../../NewBet/NewBetComponents/Summary/Summary.styles';
import { Typography } from '../../../components/Topography/topography';
import { TypographyTypes } from '../../../components/Topography/TypographyTypes';

const FieldRow: React.FC<FieldRowProps> = ({
  label,
  value = '',
  background,
  icon: Icon,
  arrValue,
  disclaimer,
  currentUser,
  isOpen,
  onToggle,
}) => {
  const { t } = useTranslation();

  if (!value && !arrValue) return null;

  return (
    <>
      <Row onClick={onToggle}>
        <Column isOpen={isOpen && label === t('BetPage.participents')}>
          <Typography value={label} variant={TypographyTypes.H3} styleProps={{ color: 'black' }} />
          {background ? (
            <SummaryRow background={background}>
              {value && (
                <Typography
                  value={value}
                  variant={TypographyTypes.TextSmall}
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
              {!isArray(arrValue) && arrValue && <RenderSingleUser user={arrValue} />}
            </>
          )}
          <RenderUserList
            arrValue={arrValue}
            currentUser={currentUser}
            isOpen={isOpen}
            Icon={Icon}
          />
          <DisclaimerWrapper isVisible={isOpen && !!disclaimer}>
            {disclaimer && (
              <Typography
                value={t(`BetPage.${disclaimer}Disclaimer`)}
                variant={TypographyTypes.TextMedium}
              />
            )}
          </DisclaimerWrapper>
        </Column>
        <RotatingArrow open={isOpen} />
      </Row>
      <StyledDivider />
    </>
  );
};

export default FieldRow;
