import { atomWithStorage } from 'jotai/utils';
import { NewBetStep, newBetSteps, NewBetStepValueTypes } from '@pages/new-bet/new-bet-steps';

export const ActiveStep = atomWithStorage<NewBetStep>(
  'NewBetStep',
  newBetSteps[NewBetStepValueTypes.Start],
  {
    getItem: (key) => {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : null;
    },
    setItem: (key, value) => {
      localStorage.setItem(key, JSON.stringify(value));
    },
    removeItem: (key) => {
      localStorage.removeItem(key);
    },
  }
);
