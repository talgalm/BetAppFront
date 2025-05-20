import StyledButton, { ButtonConfig } from '../components/Button/StyledButton';
import { ThemeType } from '../Theme/theme';
import { ButtonsHubContainer } from './ButtonsHub.styles';

export enum ButtonsHubStatus {
  FIXED = 'fixed',
  COLUMN = 'relative',
  ROW = 'row',
}

type ButtonsHubProps = {
  type?: ButtonsHubStatus;
  buttons: ButtonConfig[];
};

export const ButtonsHub: React.FC<ButtonsHubProps> = ({
  type = ButtonsHubStatus.COLUMN,
  buttons,
}) => {
  const isFixed = type === ButtonsHubStatus.FIXED;
  const isRow = type === ButtonsHubStatus.ROW;
  return (
    <ButtonsHubContainer isFixed={isFixed} isRow={isRow}>
      {buttons.map(
        (
          { value, onClick, colorVariant = ThemeType.Primary, styleProps, disabled, icon },
          index
        ) => (
          <StyledButton
            key={index}
            value={value}
            colorVariant={colorVariant}
            onClick={onClick}
            styleProps={styleProps}
            disabled={disabled}
            icon={icon}
          />
        )
      )}
    </ButtonsHubContainer>
  );
};

export default ButtonsHub;
