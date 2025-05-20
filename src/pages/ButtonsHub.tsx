import StyledButton from '../components/Button/StyledButton';
import { ThemeType } from '../Theme/theme';
import { ButtonsHubContainer } from './ButtonsHub.styles';

type ButtonsHubProps = {
  type?: 'fixed' | 'relative';
  textButtonUp: string;
  textButtonDown?: string;
  onClickButtonUp?: () => void;
  onClickButtonDown?: () => void;
  propsOverrideButtonsDown?: React.CSSProperties;
};

export const ButtonsHub: React.FC<ButtonsHubProps> = ({
  type = 'relative',
  textButtonUp,
  textButtonDown,
  onClickButtonUp,
  onClickButtonDown,
  propsOverrideButtonsDown,
}) => {
  const isFixed = type === 'fixed';

  return (
    <ButtonsHubContainer isFixed={isFixed}>
      <StyledButton
        value={textButtonUp}
        colorVariant={ThemeType.Primary}
        onClick={onClickButtonUp}
      />
      {textButtonDown && (
        <StyledButton
          value={textButtonDown}
          colorVariant={ThemeType.Secondary}
          onClick={onClickButtonDown}
          styleProps={propsOverrideButtonsDown}
        />
      )}
    </ButtonsHubContainer>
  );
};

export default ButtonsHub;
