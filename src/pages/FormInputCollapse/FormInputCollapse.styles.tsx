import { styled } from "@mui/material/styles";
import { TypographyTypes } from "../../Theme/Typography/typography";
import Calendar from "react-calendar";


export const PageContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  justifyContent: "center",
  textAlign: "right",
  gap: 16,
  paddingRight: 24,
  paddingLeft: 24,
  paddingTop: 36,
});

export const BetInput = styled("input")<{
  typography: typeof TypographyTypes.H5;
}>(({ typography }) => ({
  width: "100%",
  direction: "rtl",
  marginTop: 16,
  border: "1.5px solid #9798A2",
  borderRadius: 8,
  fontSize: typography.fontSize,
  fontFamily: "IBM Plex Sans Hebrew",
  fontWeight: typography.fontWeight,
  outline: "none",
  color: typography.color,
  padding: "16px 16px 96px",
  "&::placeholder": {
    color: "#BDBDBD",
  },
}));

export const BetNameInput = styled("input")<{
  typography: typeof TypographyTypes.H2;
}>(({ typography }) => ({
  border: "none",
  width: "100%",
  outline: "none",
  direction: "rtl",
  backgroundColor: "transparent",
  color: typography.color,
  fontSize: typography.fontSize,
  fontFamily: "IBM Plex Sans Hebrew",
  fontWeight: typography.fontWeight,
  padding: "0",
  borderBottom: "1px solid transparent",
}));

export const InputDiv = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 8,
});

export const InputHeadline = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  textAlign: "right",
  gap: 8,
  paddingTop: 24,
  direction: "rtl",
  paddingBottom: 5,
  borderBottom: "1px solid #9798A2",
});

export const NumOfChars = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  paddingLeft: 16,
  marginTop: -24,
});
export const AddParticipantsDiv = styled("div")({
  display: "flex",
  flexDirection: "row",
  direction: "rtl",
  flexWrap: "wrap",
  gap: 8,
  width: "100%",
  maxWidth: "100%",
  alignItems: "center",
  justifyContent: "flex-start",
  paddingTop: 8,
  boxSizing: "border-box",
});
export const AddConditionsDiv = styled("div")({
  display: "flex",
  flexDirection: "column",
  direction: "rtl",
  flexWrap: "wrap",
  gap: 8,
  width: "100%",
  maxWidth: "100%",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  paddingTop: 8,
  boxSizing: "border-box",
});

export const AddParticipantTag = styled("div")({
  display: "flex",
  flexDirection: "row",
  direction: "rtl",
  gap : 4
});

export const ParticipantTag = styled("div")({
  display: "flex",
  flexDirection: "row",
  direction: "rtl",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 10,
  gap: 10,
  width: 121,
  height: 44,
  borderRadius: "8px",
  border: "1.5px solid black",
  opacity: 1,
});

const StyledCalendar = styled(Calendar)`
  border: none;
  font-family: "IBM Plex Sans Hebrew", sans-serif;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .react-calendar__tile {
    background-color: transparent;
    color: black;
    border: none;
    border-radius: 0;
    padding: 0;
    width: 40px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-family: "IBM Plex Sans Hebrew", sans-serif;
  }

  .react-calendar__tile--active {
    marginTop:100px;
    background-color: #7f8cb9;
    color: white;
    border-radius: 50%;
    width: 40px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-family: "IBM Plex Sans Hebrew", sans-serif;
  }

  .react-calendar__navigation {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;
    background: none;
    box-shadow: none;
    padding: 0;
    width: 250px;
  }

  .react-calendar__navigation button {
    background: none;
    border: none;
    padding: 0 0px;
    cursor: pointer;
    font-size: 16px;
    font-family: "IBM Plex Sans Hebrew", sans-serif;
  }

  .react-calendar__month-view__weekdays__weekday,
  .react-calendar__month-view__weekdays__weekday abbr {
    color: #7f8cb9;
    font-weight: bold;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    font-size: 14px;
    font-family: "IBM Plex Sans Hebrew", sans-serif;
    list-style: none;
  }
`;



export default StyledCalendar;





