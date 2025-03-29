import React, { useState, useRef, useCallback } from 'react';
import { ModalColumn, ModalRow, PopUpContainer, PopUpOverlay } from './BetimModal.styles';
import { Typography } from '../../../components/Topography/topography';
import { TypographyTypes } from '../../../Theme/Typography/typography';
import { useTranslation } from 'react-i18next';
import { ReactComponent as PlusIcon } from '../../../Theme/Icons/AddIcon.svg';
import { ReactComponent as MinusIcon } from '../../../Theme/Icons/Minus.svg';
import { ReactComponent as BetimIcon } from '../../../Theme/Icons/Betim.svg';

interface BetimModalProps {
  isOpen: boolean;
  closeModal: () => void;
  setCoins: (coins: number) => void;
}

const BetimModal: React.FC<BetimModalProps> = ({ isOpen, closeModal, setCoins }) => {
  const { t } = useTranslation();
  const [counter, setCounter] = useState(10);

  const plusPressTimer = useRef<NodeJS.Timeout | null>(null);
  const minusPressTimer = useRef<NodeJS.Timeout | null>(null);
  const longPressThreshold = 200;
  const incrementInterval = 100;

  const handlePlusClick = () => {
    setCounter((prev) => prev + 1);
  };

  const handleMinusClick = () => {
    setCounter((prev) => Math.max(0, prev - 1));
  };

  const startPlusLongPress = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();

    plusPressTimer.current = setTimeout(() => {
      plusPressTimer.current = setInterval(() => {
        setCounter((prev) => prev + 1);
      }, incrementInterval);
    }, longPressThreshold);
  }, []);

  const startMinusLongPress = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();

    minusPressTimer.current = setTimeout(() => {
      minusPressTimer.current = setInterval(() => {
        setCounter((prev) => Math.max(0, prev - 1));
      }, incrementInterval);
    }, longPressThreshold);
  }, []);

  const clearPlusTimer = useCallback(() => {
    if (plusPressTimer.current) {
      clearTimeout(plusPressTimer.current);
      clearInterval(plusPressTimer.current);
      plusPressTimer.current = null;
    }
  }, []);

  const clearMinusTimer = useCallback(() => {
    if (minusPressTimer.current) {
      clearTimeout(minusPressTimer.current);
      clearInterval(minusPressTimer.current);
      minusPressTimer.current = null;
    }
  }, []);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setCoins(counter);
      closeModal();
    }
  };

  return (
    <PopUpOverlay isOpen={isOpen} onClick={handleOverlayClick}>
      <PopUpContainer>
        <Typography value={t(`NewBet.ModalCoinsTitle`)} variant={TypographyTypes.H3} />
        <Typography value={t(`NewBet.ModalCoinsSubtitle`)} variant={TypographyTypes.H4} />
        <ModalRow>
          <PlusIcon
            height={36}
            width={36}
            onClick={handlePlusClick}
            onMouseDown={startPlusLongPress}
            onMouseUp={clearPlusTimer}
            onMouseLeave={clearPlusTimer}
            onTouchStart={startPlusLongPress}
            onTouchEnd={clearPlusTimer}
            onTouchCancel={clearPlusTimer}
            style={{ cursor: 'pointer' }}
          />
          <ModalColumn>
            <BetimIcon height={48} width={48} color="black" />
            <Typography value={counter} variant={TypographyTypes.H1} />
          </ModalColumn>
          <MinusIcon
            height={40}
            width={40}
            onClick={handleMinusClick}
            onMouseDown={startMinusLongPress}
            onMouseUp={clearMinusTimer}
            onMouseLeave={clearMinusTimer}
            onTouchStart={startMinusLongPress}
            onTouchEnd={clearMinusTimer}
            onTouchCancel={clearMinusTimer}
            style={{ cursor: 'pointer' }}
          />
        </ModalRow>
      </PopUpContainer>
    </PopUpOverlay>
  );
};

export default BetimModal;
