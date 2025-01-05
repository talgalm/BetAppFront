import { styled } from "@mui/material/styles";
import Calendar from "react-calendar";

export const StyledCalendar = styled(Calendar)`
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
    margintop: 100px;
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
