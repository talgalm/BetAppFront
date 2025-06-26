import { ReactComponent as RightArrow } from '../../theme/icons/arrowRight.svg';
import { ReactComponent as LeftArrow } from '../../theme/icons/arrowLeft.svg';
import { useState } from 'react';
import { StyledCalendar } from './Calender.styles';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface CalendarProps<T extends FieldValues> {
  control: Control<T>;
  inputName: Path<T> | undefined;
}

const getToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

const Calendar = <T extends FieldValues>({ control, inputName }: CalendarProps<T>) => {
  const [activeStartDate, setActiveStartDate] = useState(getToday());

  const hebrewWeekdayFormatter = (locale: string | undefined, date: Date) => {
    const weekdays = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'];
    return weekdays[date.getDay()];
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isPrevDisabled = () => {
    const today = new Date();
    today.setDate(1);
    today.setHours(0, 0, 0, 0);
    const activeMonth = new Date(activeStartDate);
    activeMonth.setDate(1);
    activeMonth.setHours(0, 0, 0, 0);

    return activeMonth <= today;
  };

  const disableTile = (date: Date, view: string) => {
    const today = getToday();
    if (view === 'month') {
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
      return monthStart < new Date(today.getFullYear(), today.getMonth(), 1);
    }
    if (view === 'year') {
      return date.getFullYear() < today.getFullYear();
    }
    const dateToCheck = new Date(date);
    dateToCheck.setHours(0, 0, 0, 0);
    return dateToCheck < today;
  };

  return (
    <div>
      {inputName && (
        <Controller
          name={inputName}
          control={control}
          render={({ field }) => (
            <StyledCalendar
              onChange={(value) => {
                const selectedDate = field.value as Date | null;
                const selectedDateStr = selectedDate?.toDateString?.() ?? '';
                const newDateStr = (value as Date)?.toDateString?.() ?? '';
                const isSameDay = selectedDateStr === newDateStr;
                field.onChange(isSameDay ? null : value);
              }}
              value={field.value}
              nextLabel={
                <LeftArrow width={12} height={12} style={{ transform: 'rotate(180deg)' }} />
              }
              prevLabel={
                <RightArrow
                  width={12}
                  height={12}
                  style={{
                    opacity: isPrevDisabled() ? 0.3 : 1,
                    pointerEvents: isPrevDisabled() ? 'none' : 'auto',
                  }}
                />
              }
              next2Label={null}
              prev2Label={null}
              formatShortWeekday={hebrewWeekdayFormatter}
              locale="he"
              showNeighboringMonth={false}
              minDate={today}
              tileDisabled={({ date, view }) => disableTile(date, view)}
              onActiveStartDateChange={({ activeStartDate }) => {
                setActiveStartDate(activeStartDate ?? new Date());
              }}
            />
          )}
        />
      )}
    </div>
  );
};

export default Calendar;
