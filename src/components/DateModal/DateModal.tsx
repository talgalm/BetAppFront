import React, { useEffect } from 'react';
import { PopUpContainer, PopUpContentContainer, PopUpOverlay } from './DateModal.styles';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import Calendar from '../Calendar/Calendar';
import { ReactComponent as CloseIcon } from '../../Theme/Icons/Close.svg';
import { useTranslation } from 'react-i18next';
import StyledButton from '../Button/StyledButton';

interface DateModalProps<T extends FieldValues> {
  isOpen: boolean;
  closeModal: (discard?: boolean) => void;
  control: Control<T>;
  inputName: Path<T> | undefined;
  onChange?: (value: string) => void;
}

const DateModal = <T extends FieldValues>({
  isOpen,
  closeModal,
  inputName,
  control,
  onChange,
}: DateModalProps<T>): JSX.Element => {
  const { t } = useTranslation();

  const {
    field: { value },
  } = useController({
    control,
    name: inputName || ('' as Path<T>),
  });

  useEffect(() => {
    if (onChange && value) {
      onChange(value);
    }
  }, [value]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal(true);
    }
  };

  return (
    <PopUpOverlay isOpen={isOpen} onClick={handleOverlayClick}>
      <PopUpContainer>
        <PopUpContentContainer>
          <CloseIcon onClick={handleOverlayClick} />
          <Calendar control={control} inputName={inputName} />
        </PopUpContentContainer>
        <StyledButton
          value={t(`NewBet.Approve`)}
          onClick={() => closeModal()}
          styleProps={{
            width: '100%',
            backgroundColor: 'white',
            color: value ? '#15AB94' : '#A8D6CC',
            border: '0px',
          }}
        />
      </PopUpContainer>
    </PopUpOverlay>
  );
};

export default DateModal;
