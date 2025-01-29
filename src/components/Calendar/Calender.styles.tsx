import { styled } from '@mui/material/styles';
import Calendar from 'react-calendar';

export const StyledCalendar = styled(Calendar)`
  border: none;
  font-family: 'IBM Plex Sans Hebrew', sans-serif;
  font-size: 14px;
  display: flex;
  width: 100%;
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
    font-family: 'IBM Plex Sans Hebrew', sans-serif;
    position: relative;
  }

  .react-calendar__tile--active {
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-family: 'IBM Plex Sans Hebrew', sans-serif;
    position: relative;
  }

  .react-calendar__tile--active abbr {
    width: 30px;
    height: 30px;
    background-color: #7f8cb9;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }

  .react-calendar__navigation {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;
    background: none;
    box-shadow: none;
    padding: 0;
    width: 200px;
  }

  .react-calendar__navigation button {
    background: none;
    border: none;
    padding: 0 0px;
    cursor: pointer;
    font-size: 16px;
    font-family: 'IBM Plex Sans Hebrew', sans-serif;
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
    font-family: 'IBM Plex Sans Hebrew', sans-serif;
    list-style: none;
  }
`;

export const CheckboxDiv = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
});
