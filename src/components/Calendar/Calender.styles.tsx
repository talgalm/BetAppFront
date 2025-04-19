import { styled } from '@mui/material/styles';
import Calendar from 'react-calendar';

export const StyledCalendar = styled(Calendar)`
  border: none;
  font-family: 'Fredoka', sans-serif;
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
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 400;
    font-family: 'Fredoka', sans-serif;
    position: relative;
  }

  .react-calendar__tile--active {
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-family: 'Fredoka', sans-serif;
    position: relative;
  }

  .react-calendar__tile--active abbr {
    width: 30px;
    height: 30px;
    font-size: 16px;
    background-color: #ceefea;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #15ab94;
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
    font-size: 18px;
    font-weight: 500;
    font-family: 'Fredoka', sans-serif;
    color: black;
  }

  .react-calendar__month-view__weekdays__weekday,
  .react-calendar__month-view__weekdays__weekday abbr {
    color: #7f8cb9;
    font-weight: 400;
    text-transform: uppercase;
    display: flex;
    height: 40px;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    font-size: 16px;
    font-family: 'Fredoka', sans-serif;
    list-style: none;
  }
`;

export const CheckboxDiv = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
});
