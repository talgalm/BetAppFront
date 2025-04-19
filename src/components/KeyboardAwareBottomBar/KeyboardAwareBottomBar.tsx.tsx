// KeyboardAwareBottomBar.tsx
import React from 'react';
import { useKeyboardVisibility } from '../../Hooks/useKeyboardVisibility';
import { ButtonsContainer } from '../../pages/NewBet/NewBet.styles';

interface KeyboardAwareBottomBarProps {
  children: React.ReactNode;
  className?: string;
}

export const KeyboardAwareBottomBar: React.FC<KeyboardAwareBottomBarProps> = ({
  children,
  className = '',
}) => {
  const { isKeyboardVisible, elementRef } = useKeyboardVisibility({ offset: 85 });

  return (
    <ButtonsContainer
      ref={elementRef}
      className={`${className} ${isKeyboardVisible ? 'keyboard-visible' : ''}`}
    >
      {children}
    </ButtonsContainer>
  );
};
