import React, { useEffect, useState } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import {
  ChangeableCoinContainer,
  CoinContainer,
  CoinsGridContainer,
  RowContentContainer,
  StyledDivider,
} from '../Betim/Betim.styles';
import { Typography } from '../../../../components/Topography/topography';
import { TypographyTypes } from '../../../../Theme/Typography/typography';
import { PRIMARY_COLOR } from '../../../../Theme/ColorTheme';
import { ReactComponent as PlusIcon } from '../../../../Theme/Icons/AddIcon.svg';
import { ReactComponent as MinusIcon } from '../../../../Theme/Icons/Minus.svg';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import { userAtom } from '../../../../Jotai/atoms';
import { useUser } from '../../../../Hooks/hookQuery/useGetUser';

interface BetimProps<T extends FieldValues> {
  control?: Control<T>;
  inputName: Path<T>;
}

const Betim = <T extends FieldValues>({ inputName, control }: BetimProps<T>): JSX.Element => {
  const { t } = useTranslation();
  const { field } = useController({ name: inputName, control });
  const [userCurrentCoins, setUserCurrentCoins] = useState<number>(0);
  const [user, setUser] = useAtom(userAtom);
  const userId = user?.id ?? '';
  const { data, isLoading, error } = useUser(userId);
  const [isCustomValue, setIsCustomValue] = useState(false);

  const BetimArray = [20, 30, 40, 0];

  useEffect(() => {
    if (data) setUser(data);
  }, [data, setUser]);

  useEffect(() => {
    if (user?.points !== undefined) setUserCurrentCoins(user.points);
  }, [user]);

  const handleCoinsChange = (value: number, isCustom = false) => {
    // eslint-disable-next-line no-constant-condition
    if (true) {
      field.onChange(value);
      setUserCurrentCoins(200 - value);
      setIsCustomValue(isCustom);
    }
  };
  /////// !!!!!!!!!!!

  const handlePlusClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    handleCoinsChange((field.value ?? 0) + 1, true);
  };

  const handleMinusClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if ((field.value ?? 0) > 0) {
      handleCoinsChange((field.value ?? 0) - 1, true);
    }
  };

  return (
    <>
      <RowContentContainer>
        <Typography
          value={`${t('Input.YourBalance')} ${userCurrentCoins} ${t('Input.Coins')}`}
          variant={TypographyTypes.H3}
          styleProps={{ color: '#15AB94' }}
        />
      </RowContentContainer>
      <CoinsGridContainer>
        {BetimArray.map((item, index) => {
          const isSelected = isCustomValue ? index === 3 : field.value === item;

          return (
            <CoinContainer
              key={index}
              onClick={() => handleCoinsChange(item, index === 3)}
              isSelected={isSelected}
            >
              {isSelected && index === 3 ? (
                <ChangeableCoinContainer>
                  <MinusIcon onClick={handleMinusClick} />
                  <StyledDivider flexItem />
                  <Typography
                    value={field.value ?? 0}
                    variant={TypographyTypes.H1}
                    styleProps={{ color: PRIMARY_COLOR }}
                  />
                  <StyledDivider flexItem />
                  <PlusIcon onClick={handlePlusClick} />
                </ChangeableCoinContainer>
              ) : (
                <Typography
                  value={index === 3 ? t('NewBet.other') : item}
                  variant={TypographyTypes.H1}
                  styleProps={{ color: PRIMARY_COLOR }}
                />
              )}
            </CoinContainer>
          );
        })}
      </CoinsGridContainer>
      <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', gap: 5 }}>
        <Typography
          value={`*`}
          variant={TypographyTypes.TextSmall}
          styleProps={{ color: '#15AB94' }}
        />
        <Typography
          value={`${t('NewBet.CoinsDisclaimer')}`}
          variant={TypographyTypes.TextSmall}
          styleProps={{ color: '#9798A2' }}
        />
      </div>
    </>
  );
};

export default Betim;
