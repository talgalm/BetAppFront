import React, { ReactNode } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import BetLoader from '../Theme/Loader/loader';
import ErrorFallback, { ErrorHandler } from '../Errors/ErrorHandler';
import { ERROR_MESSAGES, ErrorTypes } from '../Errors/interface';
import { useErrorBoundary } from 'react-error-boundary';
import { useAuth } from './Hooks/useAuth';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { showBoundary } = useErrorBoundary();
  const { user, initialized, isLoading, isError, error } = useAuth();
  const location = useLocation();

  if (!initialized && isLoading) {
    return <BetLoader />;
  }

  if (isError) {
    if (error?.message === 'Network Error') {
      ErrorHandler(showBoundary, ErrorTypes.ConnectionError);
    }

    return (
      <ErrorFallback
        error={ERROR_MESSAGES[ErrorTypes.AuthError]}
        resetErrorBoundary={() => {
          // redirect depending on user presence
          window.location.href = user ? '/home' : '/';
        }}
      />
    );
  }

  // Redirect immediately before rendering children
  if (user && location.pathname === '/') {
    return <Navigate to="/home" replace />;
  }

  if (!user && location.pathname !== '/') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
