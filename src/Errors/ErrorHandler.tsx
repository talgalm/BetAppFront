import { FallbackProps } from 'react-error-boundary';
import { ERROR_MESSAGES, ErrorMessage, ErrorTypes } from './interface';
import { ReactComponent as CloseIcon } from '../Theme/Icons/Close.svg';
import {
  ButtonsContainer,
  PopUpContent,
  PopUpDiv,
  PopUpHeader,
  PopUpOverlay,
} from './ErrorHandler.styles';
import { Typography } from '../components/Topography/topography';
import { TypographyTypes } from '../Theme/Typography/typography';
import StyledButton from '../components/Button/StyledButton';

export const ErrorHandler = (
  showBoundary?: (error: { title: string; subtitle: string }) => void,
  errorType?: ErrorTypes
) => {
  console.log('showBoundary:', showBoundary);
  if (showBoundary && errorType) {
    showBoundary(ERROR_MESSAGES[errorType]);
  } else {
    console.log('showBoundary is undefined or errorType is missing');
  }
};

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const typedError = error as ErrorMessage;

  return (
    <PopUpOverlay onClick={resetErrorBoundary}>
      <PopUpDiv>
        <PopUpHeader>
          <CloseIcon onClick={resetErrorBoundary} />
        </PopUpHeader>
        <typedError.icon />
        <PopUpContent>
          <Typography value={typedError.title} variant={TypographyTypes.H3} />
          <Typography value={typedError.subtitle} variant={TypographyTypes.TextMedium} />
        </PopUpContent>
        <ButtonsContainer>
          <StyledButton value={typedError.buttonText} />
        </ButtonsContainer>
      </PopUpDiv>
    </PopUpOverlay>
  );
};

export default ErrorFallback;
