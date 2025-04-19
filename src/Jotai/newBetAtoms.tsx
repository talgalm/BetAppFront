import { atomWithStorage } from 'jotai/utils';
import { NewBetStep, newBetSteps, NewBetStepValueTypes } from '../pages/NewBet/Interface';

export const ActiveStep = atomWithStorage<NewBetStep>(
  'NewBetStep',
  newBetSteps[NewBetStepValueTypes.Start],
  {
    getItem: (key) => {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : newBetSteps[NewBetStepValueTypes.Start];
    },
    setItem: (key, value) => {
      localStorage.setItem(key, JSON.stringify(value));
    },
    removeItem: (key) => {
      localStorage.removeItem(key);
    },
  }
);
