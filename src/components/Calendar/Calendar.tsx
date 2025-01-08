import { ReactComponent as RightArrow } from "../../Theme/Icons/arrowRight.svg";
import { ReactComponent as LeftArrow } from "../../Theme/Icons/arrowLeft.svg";
import { useState } from "react";
import { CheckboxDiv, StyledCalendar } from "./Calender.styles";
import { Checkbox } from "@mui/material";
import { PRIMARY_COLOR } from "../../Theme/ColorTheme";
import { Typography } from "../Topography/topography";
import { TypographyTypes } from "../../Theme/Typography/typography";

const Calendar = () => {
  const [date, setDate] = useState<Date | null>(null);

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
      <CheckboxDiv>
        <Checkbox
          defaultChecked
          sx={{
            color: PRIMARY_COLOR,
            "&.Mui-checked": {
              color: PRIMARY_COLOR,
            },
          }}
        />
        <Typography value={"הוסף ליומן שלי"} variant={TypographyTypes.H6} />
      </CheckboxDiv>
    </div>
  );
};

export default Calendar;
