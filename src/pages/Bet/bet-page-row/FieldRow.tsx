import React from 'react';
import { useTranslation } from 'react-i18next';
import { isArray } from 'lodash';
import { FieldRowProps } from './types';
import ParticipentsListBet from './ParticipentsListBet';
import ParticipentsBet from './ParticipentsBet';
import { Row, Column, RotatingArrow, DisclaimerWrapper } from '../BetPage.styles';
import {
  SummaryRow,
  StyledDivider,
} from '../../new-bet/new-bet-components/summary-new-bet/Summary.styles';
import { Typography } from '@components/Topography/typography';
import { TypographyTypes } from '@components/Topography/TypographyTypes';
import { useAtom } from 'jotai';
import BetFilesRow from './BetFilesRow';
import { BetFile } from '@interfaces/Bet.interface';
import { finishBetAtom } from '@store/betAtoms';
import { PRIMARY_BLACK } from '@theme/colorTheme';

const FieldRow: React.FC<FieldRowProps> = ({
  label,
  value = '',
  background,
  icon: Icon,
  arrValue,
  disclaimer,
  currentUser,
  isOpen,
  files,
  onToggle,
}) => {
  const { t } = useTranslation();
  const [isFinish] = useAtom(finishBetAtom);

  if ((!value && !arrValue) || (files && files.length === 0)) return null;

  return (
    <>
      <Row onClick={onToggle} isWinner={label === t('BetPage.winner')}>
        <Column isOpen={isOpen && label === t('BetPage.participents')}>
          <Typography
            value={label}
            variant={TypographyTypes.H3}
            styleProps={{
              color: PRIMARY_BLACK,
              marginBottom: label === t('BetPage.whoWon') ? 10 : 0,
            }}
          />
          {background ? (
            <SummaryRow background={background}>
              {value && (
                <Typography
                  value={value}
                  variant={TypographyTypes.TextSmall}
                  styleProps={{ color: PRIMARY_BLACK }}
                />
              )}
              {Icon && <Icon width={18} height={18} />}
            </SummaryRow>
          ) : (
            <>
              {value && (
                <Typography value={value} variant={TypographyTypes.TextMedium} truncate={!isOpen} />
              )}
              {!isArray(arrValue) && arrValue && <ParticipentsBet user={arrValue} />}
            </>
          )}
          <ParticipentsListBet
            arrValue={arrValue}
            currentUser={currentUser}
            isOpen={isOpen}
            Icon={Icon}
          />
          {files &&
            files.length > 0 &&
            (isOpen ? files : files.slice(0, 1)).map((file: BetFile) => (
              <BetFilesRow key={file.id} {...file} />
            ))}
          <DisclaimerWrapper isVisible={isOpen && !!disclaimer}>
            {disclaimer && (
              <Typography
                value={t(`BetPage.${disclaimer}Disclaimer`, { value })}
                variant={TypographyTypes.TextMedium}
              />
            )}
          </DisclaimerWrapper>
        </Column>
        {!isFinish ? <RotatingArrow open={isOpen} /> : <div></div>}
      </Row>
      {!isFinish ? <StyledDivider /> : <div></div>}
    </>
  );
};

export default FieldRow;
