import { useTranslation } from 'react-i18next';
import { PopUpDiv, PopUpOverlay } from '../ContactModal/ContactModal.styles';
import { PopUpContent, PopUpHeader } from './ConditionModal.styles';
import { Typography } from '@components/Topography/typography';
import { ReactComponent as CalendarIcon } from '../../Theme/Icons/CalendarIcon.svg';
import Calendar from '@components/Calendar/Calendar';
import { FieldValues, Control, Path } from 'react-hook-form';
import { TypographyTypes } from '@components/Topography/TypographyTypes';
import { User } from '@interfaces/User.interface';

interface ConditionModalProps<T extends FieldValues> {
  open: boolean;
  handleClose: () => void;
  control: Control<T, any>;
  inputName: Path<T>;
  users?: User[];
}

const ConditionModal = <T extends FieldValues>({
  open,
  handleClose,
  control,
  inputName,
  users,
}: ConditionModalProps<T>) => {
  const { t } = useTranslation();

  return (
    <PopUpOverlay isOpen={open} onClick={handleClose}>
      <PopUpDiv isOpen={open} onClick={(e) => e.stopPropagation()}>
        <PopUpHeader>
          <Typography
            value={t('ConditionModal.chooseDate')}
            variant={TypographyTypes.H2}
            styleProps={{ color: '#48494D' }}
          />
          <CalendarIcon color="#48494D" />
        </PopUpHeader>
        <PopUpContent>
          {/* <Calendar control={control} inputName={inputName} users={users} /> */}
        </PopUpContent>
      </PopUpDiv>
    </PopUpOverlay>
  );
};

export default ConditionModal;
