import React, { useEffect, useState } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import {
  ChangeableCoinContainer,
  CoinContainer,
  CoinsGridContainer,
  RowContentContainer,
  StyledDivider,
} from './Betim.styles';
import { Typography } from '@components/Topography/typography';
import { PRIMARY_GREEN, PRIMARY_GREY } from '@theme/colorTheme';
import { ReactComponent as PlusIcon } from '@assets/icons/AddIcon.svg';
import { ReactComponent as MinusIcon } from '@assets/icons/Minus.svg';
import { useTranslation } from 'react-i18next';
import { TypographyTypes } from '@components/Topography/TypographyTypes';
import { useQueryClient } from '@tanstack/react-query';
import { User } from '@interfaces/User.interface';

interface BetimProps<T extends FieldValues> {
  control?: Control<T>;
  inputName: Path<T>;
}

const Betim = <T extends FieldValues>({ inputName, control }: BetimProps<T>): JSX.Element => {
  const { t } = useTranslation();
  const { field } = useController({ name: inputName, control });
  const [userCurrentCoins, setUserCurrentCoins] = useState<number>(0);
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(['user-profile']);

  const [isCustomValue, setIsCustomValue] = useState(false);

  const BetimArray = [20, 30, 40, 0];

  useEffect(() => {
    if (user?.betim !== undefined) setUserCurrentCoins(user.betim);
  }, [user]);

  const handleCoinsChange = (value: number, isCustom = false) => {
    if (user?.betim) {
      field.onChange(value);
      setUserCurrentCoins(user?.betim - value);
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
          styleProps={{ color: PRIMARY_GREEN }}
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
                    styleProps={{ color: PRIMARY_GREEN }}
                  />
                  <StyledDivider flexItem />
                  <PlusIcon onClick={handlePlusClick} />
                </ChangeableCoinContainer>
              ) : (
                <Typography
                  value={index === 3 ? t('NewBet.other') : item}
                  variant={TypographyTypes.H1}
                  styleProps={{ color: PRIMARY_GREEN }}
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
          styleProps={{ color: PRIMARY_GREEN }}
        />
        <Typography
          value={`${t('NewBet.betimDisclaimer')}`}
          variant={TypographyTypes.TextSmall}
          styleProps={{ color: PRIMARY_GREY }}
        />
      </div>
    </>
  );
};

export default Betim;
