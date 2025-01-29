import React, { createContext, useContext, ReactNode, useCallback } from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { userAtom } from '../Jotai/atoms';

// Define the shape of the context
interface LogoutContextType {
  logout: () => void;
}

// Create the context
const LogoutContext = createContext<LogoutContextType | undefined>(undefined);

// Provider component
export const LogoutProvider = ({ children }: { children: ReactNode }) => {
  const [, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    // Clear local storage
    localStorage.clear();
    // Reset userAtom to its default value
    setUser({ username: '' });
    // Show alert
    alert('You have been logged out.');
    // Navigate to the login page
    navigate('/login');
  }, [setUser, navigate]);

  return <LogoutContext.Provider value={{ logout }}>{children}</LogoutContext.Provider>;
};

export const useLogout = (): LogoutContextType => {
  const context = useContext(LogoutContext);
  if (!context) {
    throw new Error('useLogout must be used within a LogoutProvider');
  }
  return context;
};
