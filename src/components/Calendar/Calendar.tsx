import { ReactComponent as RightArrow } from '../../Theme/Icons/arrowRight.svg';
import { ReactComponent as LeftArrow } from '../../Theme/Icons/arrowLeft.svg';
import { useEffect, useState } from 'react';
import { CheckboxDiv, StyledCalendar } from './Calender.styles';
import { Checkbox } from '@mui/material';
import { PRIMARY_COLOR } from '../../Theme/ColorTheme';
import { Typography } from '../Topography/topography';
import { useTranslation } from 'react-i18next';
import { Control, Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import { TypographyTypes } from '../Topography/TypographyTypes';

interface CalendarProps<T extends FieldValues> {
  control: Control<T>;
  inputName: Path<T> | undefined;
  displayAddToCalendar?: boolean;
}

const Calendar = <T extends FieldValues>({
  control,
  inputName,
  displayAddToCalendar,
}: CalendarProps<T>) => {
  const { t } = useTranslation();
  const { setValue } = useFormContext();

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (isChecked) setValue('AddTocalendar', isChecked);
  }, [isChecked, setValue]);

  const hebrewWeekdayFormatter = (locale: string | undefined, date: Date) => {
    // Get just the Hebrew letter without any apostrophe
    const weekdays = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'];
    return weekdays[date.getDay()];
  };

  return (
    <div>
      {inputName && (
        <Controller
          name={inputName}
          control={control}
          render={({ field }) => (
            <StyledCalendar
              onChange={(value) => field.onChange(value)}
              value={field.value}
              nextLabel={
                <LeftArrow width={12} height={12} style={{ transform: 'rotate(180deg)' }} />
              }
              prevLabel={<RightArrow width={12} height={12} />}
              next2Label={null}
              prev2Label={null}
              formatShortWeekday={hebrewWeekdayFormatter}
              locale="he"
              showNeighboringMonth={false}
            />
          )}
        />
      )}
      {displayAddToCalendar && (
        <CheckboxDiv>
          <Checkbox
            onChange={(e) => setIsChecked(e.target.checked)}
            sx={{
              color: PRIMARY_COLOR,
              '&.Mui-checked': {
                color: PRIMARY_COLOR,
              },
            }}
          />
          <Typography value={t('Calendar.addToCalendar')} variant={TypographyTypes.TextMedium} />
        </CheckboxDiv>
      )}
    </div>
  );
};

export default Calendar;
