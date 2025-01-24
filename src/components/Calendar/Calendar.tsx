import { ReactComponent as RightArrow } from "../../Theme/Icons/arrowRight.svg";
import { ReactComponent as LeftArrow } from "../../Theme/Icons/arrowLeft.svg";
import { useEffect, useState } from "react";
import { CheckboxDiv, StyledCalendar } from "./Calender.styles";
import { Checkbox } from "@mui/material";
import { PRIMARY_COLOR } from "../../Theme/ColorTheme";
import { Typography } from "../Topography/topography";
import { TypographyTypes } from "../../Theme/Typography/typography";
import { useTranslation } from "react-i18next";
import { Controller, useFormContext } from "react-hook-form";

interface CalendarProps {
  control?: any;
  inputName: string;
}

const Calendar: React.FC<CalendarProps> = ({ control, inputName }) => {
  const { t } = useTranslation();
  const { setValue } = useFormContext();

  const [isChecked, setIsChecked] = useState(true);
  
  useEffect(() => {
    setValue("AddTocalendar", isChecked);
  }, [isChecked]);

  return (
    <div>
      <Controller
        name={inputName}
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <StyledCalendar
            onChange={(value) => field.onChange(value)}
            value={field.value}
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
        )}
      />
      <CheckboxDiv>
        <Checkbox
          defaultChecked
          onChange={(e) => setIsChecked(e.target.checked)}
          sx={{
            color: PRIMARY_COLOR,
            "&.Mui-checked": {
              color: PRIMARY_COLOR,
            },
          }}
        />
        <Typography
          value={t("Calendar.addToCalendar")}
          variant={TypographyTypes.H6}
        />
      </CheckboxDiv>
    </div>
  );
};

export default Calendar;
