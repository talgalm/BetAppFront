// import { ReactComponent as RightArrow } from '../../Theme/Icons/arrowRight.svg';
// import { ReactComponent as LeftArrow } from '../../Theme/Icons/arrowLeft.svg';
// import { ReactComponent as SameDate } from '../../Theme/Icons/SameDate.svg';

// import { useEffect, useState, useRef } from 'react';
// import {
//   PopUpContainer,
//   PopUpContainerOverlay,
//   PopUpRow,
//   StyledCalendar,
//   SelectedDatesRow,
//   SelectedDatesContainer,
// } from './Calender.styles';
// import { useTranslation } from 'react-i18next';
// import { Control, Controller, FieldValues, Path, PathValue, useFormContext } from 'react-hook-form';
// import { TypographyTypes } from '../../Theme/Typography/typography';
// import { Typography } from '../Topography/topography';
// import { User } from '../../api/interfaces';
// import { Line } from '../Inputs/InputWithPoints/InputWithPoints.styles';

// const SELECTION_CLASSES = [
//   'selected-date-1', // Blue
//   'selected-date-2', // Green
//   'selected-date-3', // Orange
//   'selected-date-4', // Purple
//   'selected-date-5', // Red
//   'selected-date-6', // Teal
//   'selected-date-7', // Pink
//   'selected-date-8', // Yellow
//   'selected-date-9', // Navy
//   'selected-date-10', // Brown
// ] as const; // Ensures it's a readonly array

// const SELECTION_COLORS: Record<(typeof SELECTION_CLASSES)[number], string> = {
//   'selected-date-1': '#7f8cb9',
//   'selected-date-2': '#dcf5dc',
//   'selected-date-3': '#ffe0cc',
//   'selected-date-4': '#e6d9f2',
//   'selected-date-5': '#ffdbdb',
//   'selected-date-6': '#d1f2eb',
//   'selected-date-7': '#ffe6f2',
//   'selected-date-8': '#fff9c4',
//   'selected-date-9': '#d4e6f1',
//   'selected-date-10': '#e6d7c3',
// };

// interface CalendarProps<T extends FieldValues> {
//   control?: Control<T>;
//   inputName: Path<T>;
//   limit?: boolean;
//   maxSelections?: number;
//   users?: User[];
// }

// interface ColoredDate {
//   date: Date;
//   colorIndex: number;
//   user?: User;
// }

// const Calendar = <T extends FieldValues>({
//   control,
//   inputName,
//   limit = false,
//   users,
// }: CalendarProps<T>) => {
//   const { t } = useTranslation();
//   const { setValue } = useFormContext<T>();

//   const [selectedColoredDates, setSelectedColoredDates] = useState<ColoredDate[]>([]);
//   const [nextColorIndex, setNextColorIndex] = useState(0);
//   const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
//   const [showPopup, setShowPopup] = useState(false);
//   const [lastClickedDate, setLastClickedDate] = useState<Date | null>(null);

//   const calendarRef = useRef<HTMLDivElement>(null);
//   const colorAssignmentMapRef = useRef<Map<string, number>>(new Map());

//   const selectedDates = selectedColoredDates.map((item) => item.date);

//   useEffect(() => {
//     setValue(inputName, selectedDates as unknown as PathValue<T, Path<T>>);
//   }, [selectedDates, setValue, inputName]);

//   const handleDateClickPopUp = (clickedDate: Date, event: React.MouseEvent<HTMLButtonElement>) => {
//     const targetElement = event.currentTarget;
//     const rect = targetElement.getBoundingClientRect();

//     if (calendarRef.current) {
//       const { left: calendarLeft, top: calendarTop } = calendarRef.current.getBoundingClientRect();
//       const { left, bottom } = rect;
//       const isWeekend = clickedDate.getDay() === 5 || clickedDate.getDay() === 6;
//       const posX = isWeekend ? -10 : 75;

//       setPopupPosition({
//         x: left - calendarLeft - posX,
//         y: bottom - calendarTop - 10,
//       });
//     }
//     setShowPopup(true);
//     // let check = false;
//     // for (const date of selectedDates) {
//     //   if (date.getDate() === clickedDate.getDate()) {
//     //     setShowPopup(false);
//     //     check = true;
//     //   }
//     // }
//     // if (!check) {
//     //   setShowPopup(true);
//     // }
//     // if (lastClickedDate?.toDateString() === clickedDate.toDateString()) {
//     //   removeDate(clickedDate);
//     // }
//     setLastClickedDate(clickedDate);
//   };
//   const handleDateClick = (user?: User) => {
//     const dateString = lastClickedDate?.toDateString();
//     setLastClickedDate(lastClickedDate);
//     setShowPopup(false);
//     if (dateString) {
//       setSelectedColoredDates((prevColoredDates) => {
//         const existingIndex = prevColoredDates.findIndex(
//           (item) => item.date.toDateString() === dateString
//         );

//         if (existingIndex !== -1) {
//           return prevColoredDates.filter((item) => item.date.toDateString() !== dateString);
//         } else {
//           let colorIndex: number;

//           if (colorAssignmentMapRef.current.has(dateString)) {
//             colorIndex = colorAssignmentMapRef.current.get(dateString)!;
//           } else {
//             colorIndex = nextColorIndex % SELECTION_CLASSES.length;
//             colorAssignmentMapRef.current.set(dateString, colorIndex);
//             setNextColorIndex((prevIndex) => (prevIndex + 1) % SELECTION_CLASSES.length);
//           }

//           if (lastClickedDate) {
//             return limit
//               ? [{ date: lastClickedDate, colorIndex: 0, user }]
//               : [...prevColoredDates, { date: lastClickedDate, colorIndex, user }];
//           }
//           return prevColoredDates;
//         }
//       });
//     }
//   };

//   const removeDate = (date: Date) => {
//     setSelectedColoredDates((prevColoredDates) =>
//       prevColoredDates.filter((item) => item.date.toDateString() !== date.toDateString())
//     );
//   };

//   const getDateClassName = (date: Date) => {
//     const coloredDate = selectedColoredDates.find(
//       (item) => item.date.toDateString() === date.toDateString()
//     );

//     if (coloredDate) {
//       return SELECTION_CLASSES[coloredDate.colorIndex];
//     }

//     return '';
//   };

//   const closePopup = () => {
//     setShowPopup(false);
//   };
//   const convertDateToHebrew = (date: Date) => {
//     return date.toLocaleDateString('he-IL', {
//       day: 'numeric',
//       month: 'long',
//       year: 'numeric',
//     });
//   };

//   useEffect(() => {
//     const handleOutsideClick = (event: MouseEvent) => {
//       if (
//         calendarRef.current &&
//         !calendarRef.current.contains(event.target as Node) &&
//         !(event.target as Element).getAttribute('data-popup')
//       ) {
//         setShowPopup(false);
//       }
//     };

//     document.addEventListener('mousedown', handleOutsideClick);
//     return () => {
//       document.removeEventListener('mousedown', handleOutsideClick);
//     };
//   }, []);

//   const isAvailable = (user: User) => {
//     return !selectedColoredDates.some((item) => item.user?.id === user.id);
//   };

//   return (
//     <div ref={calendarRef} style={{ position: 'relative' }}>
//       <Controller
//         control={control}
//         name={inputName}
//         render={({ field }) => (
//           <>
//             <StyledCalendar
//               onClickDay={(value, event) =>
//                 handleDateClickPopUp(value, event as React.MouseEvent<HTMLButtonElement>)
//               }
//               value={null}
//               nextLabel={<LeftArrow />}
//               prevLabel={<RightArrow />}
//               next2Label={null}
//               prev2Label={null}
//               formatShortWeekday={(locale, date) =>
//                 date.toLocaleDateString(locale, { weekday: 'narrow' })
//               }
//               locale="he"
//               showNeighboringMonth={false}
//               tileClassName={({ date }) => getDateClassName(date)}
//             />
//             <Line />
//             <SelectedDatesContainer>
//               {selectedColoredDates?.map((item) => (
//                 <SelectedDatesRow
//                   key={item.date.toDateString()}
//                   color={SELECTION_COLORS[SELECTION_CLASSES[item.colorIndex]]}
//                 >
//                   {convertDateToHebrew(item.date)}
//                 </SelectedDatesRow>
//               ))}
//             </SelectedDatesContainer>
//           </>
//         )}
//       />
//       {showPopup && lastClickedDate && (
//         <PopUpContainerOverlay posX={popupPosition.x} posY={popupPosition.y}>
//           <PopUpContainer data-popup="true" onClick={(e) => e.stopPropagation()}>
//             {selectedDates.length === 0 && (
//               <PopUpRow onClick={() => handleDateClick()}>
//                 <Typography value={t('Calendar.sameDate')} variant={TypographyTypes.H6} />
//                 <SameDate />
//               </PopUpRow>
//             )}
//             {users?.map(
//               (user) =>
//                 isAvailable(user) && (
//                   <PopUpRow key={user.id} onClick={() => handleDateClick(user)}>
//                     <Typography value={user.fullName || user.id} variant={TypographyTypes.H6} />
//                   </PopUpRow>
//                 )
//             )}
//           </PopUpContainer>
//         </PopUpContainerOverlay>
//       )}
//     </div>
//   );
// };

// export default Calendar;

import { ReactComponent as RightArrow } from '../../Theme/Icons/arrowRight.svg';
import { ReactComponent as LeftArrow } from '../../Theme/Icons/arrowLeft.svg';
import { useEffect, useState } from 'react';
import { CheckboxDiv, StyledCalendar } from './Calender.styles';
import { Checkbox } from '@mui/material';
import { PRIMARY_COLOR } from '../../Theme/ColorTheme';
import { Typography } from '../Topography/topography';
import { TypographyTypes } from '../../Theme/Typography/typography';
import { useTranslation } from 'react-i18next';
import { Control, Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

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
              nextLabel={<LeftArrow width={12} height={12} />}
              prevLabel={<RightArrow width={12} height={12} />}
              next2Label={null}
              prev2Label={null}
              formatShortWeekday={(locale, date) =>
                date.toLocaleDateString(locale, { weekday: 'narrow' })
              }
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
          <Typography value={t('Calendar.addToCalendar')} variant={TypographyTypes.H6} />
        </CheckboxDiv>
      )}
    </div>
  );
};

export default Calendar;
