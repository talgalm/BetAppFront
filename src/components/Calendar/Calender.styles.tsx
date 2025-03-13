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

  /* 1. Blue (original) */
  .selected-date-1 abbr {
    width: 30px;
    height: 30px;
    background-color: #7f8cb9;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #3254c5;
  }

  /* 2. Green (original) */
  .selected-date-2 abbr {
    width: 30px;
    height: 30px;
    background-color: #dcf5dc;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #3cc532;
  }

  /* 3. Orange */
  .selected-date-3 abbr {
    width: 30px;
    height: 30px;
    background-color: #ffe0cc;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ff8c00;
  }

  /* 4. Purple */
  .selected-date-4 abbr {
    width: 30px;
    height: 30px;
    background-color: #e6d9f2;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #8a2be2;
  }

  /* 5. Red */
  .selected-date-5 abbr {
    width: 30px;
    height: 30px;
    background-color: #ffdbdb;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #dc3545;
  }

  /* 6. Teal */
  .selected-date-6 abbr {
    width: 30px;
    height: 30px;
    background-color: #d1f2eb;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #20b2aa;
  }

  /* 7. Pink */
  .selected-date-7 abbr {
    width: 30px;
    height: 30px;
    background-color: #ffe6f2;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ff69b4;
  }

  /* 8. Yellow */
  .selected-date-8 abbr {
    width: 30px;
    height: 30px;
    background-color: #fff9c4;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffd700;
  }

  /* 9. Navy */
  .selected-date-9 abbr {
    width: 30px;
    height: 30px;
    background-color: #d4e6f1;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000080;
  }

  /* 10. Brown */
  .selected-date-10 abbr {
    width: 30px;
    height: 30px;
    background-color: #e6d7c3;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #8b4513;
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
    padding: 0;
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

export const PopUpContainerOverlay = styled('div')<{
  posX: number;
  posY: number;
}>(({ posX, posY }) => ({
  position: 'absolute',
  left: `${posX}px`,
  top: `${posY}px`,
}));

export const PopUpContainer = styled('div')({
  position: 'relative',
  right: 0,
  marginTop: 4,
  width: 113,
  gap: 100,
  paddingTop: 5,
  borderRadius: '8px',
  border: '1.5px solid #7F8CB9',
  opacity: 1,
  backgroundColor: '#F8F8FD',
  zIndex: 1000,
});

export const PopUpRow = styled('div')({
  width: '100%',
  justifyContent: 'space-between',
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  padding: 4,
});
export const SelectedDatesContainer = styled('div')({
  gap: 10,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

export const SelectedDatesRow = styled('div')<{ color: string }>(({ color }) => {
  const shadowColor = darkenColor(color, 0.3);

  return {
    backgroundColor: color,
    width: '100%',
    height: 73,
    gap: 8,
    borderRadius: 8,
    padding: 8,
    boxShadow: `
      0px 1px 3px 0px ${shadowColor}33, 
      0px 5px 5px 0px ${shadowColor}28, 
      0px 10px 6px 0px ${shadowColor}1A, 
      0px 18px 7px 0px ${shadowColor}0A, 
      0px 28px 8px 0px ${shadowColor}00
    `,
  };
});

const darkenColor = (color: string, factor: number): string => {
  if (color.startsWith('#')) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    const darkR = Math.max(0, Math.floor(r * (1 - factor)));
    const darkG = Math.max(0, Math.floor(g * (1 - factor)));
    const darkB = Math.max(0, Math.floor(b * (1 - factor)));

    return `#${darkR.toString(16).padStart(2, '0')}${darkG.toString(16).padStart(2, '0')}${darkB.toString(16).padStart(2, '0')}`;
  }

  return color;
};
