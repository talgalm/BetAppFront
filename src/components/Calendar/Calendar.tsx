import { ReactComponent as RightArrow } from "../../Theme/Icons/arrowRight.svg";
import { ReactComponent as LeftArrow } from "../../Theme/Icons/arrowLeft.svg";
import { useState } from "react";
import { StyledCalendar } from "./Calender.styles";

const Calendar = () => {
   const [date, setDate] = useState(new Date());

    return (
      <div>
        <StyledCalendar
          onChange={(value) => setDate(value as Date)}
          value={date}
          nextLabel={<LeftArrow />}
          prevLabel={<RightArrow />}
          next2Label={null}
          prev2Label={null}
          formatShortWeekday={(locale, date) =>
            date.toLocaleDateString(locale, { weekday: "narrow" })
          }
          locale="he"
          showNeighboringMonth={false}
        />
      </div>
    );
}

export default Calendar;