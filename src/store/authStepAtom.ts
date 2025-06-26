import { atomWithStorage } from 'jotai/utils';
import { AuthStep, authSteps, AuthStepValueTypes } from '@pages/Auth/WelcomePage/auth-steps';

export const UserActiveStep = atomWithStorage<AuthStep>(
  'AuthStep',
  authSteps[AuthStepValueTypes.Welcome],
  {
    getItem: (key) => {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : authSteps[AuthStepValueTypes.Welcome];
    },
    setItem: (key, value) => {
      localStorage.setItem(key, JSON.stringify(value));
    },
    removeItem: (key) => {
      localStorage.removeItem(key);
    },
  }
);
