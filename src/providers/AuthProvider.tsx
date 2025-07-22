import { ReactNode } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import BetLoader from '@components/loader/loader';
import ErrorFallback, { ErrorHandler } from '@errors/ErrorHandler';
import { ERROR_MESSAGES, ErrorTypes } from '@errors/errors';
import { useErrorBoundary } from 'react-error-boundary';
import { useAuth } from './hooks/useAuth';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { showBoundary } = useErrorBoundary();
  const location = useLocation();
  const onLoginPage = location.pathname === '/';

  const { user, initialized, isLoading, isError, error } = useAuth(!!onLoginPage);

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
    console.log('2');
    return <Navigate to="/home" replace />;
  }

  if (!user && location.pathname !== '/') {
    console.log('1');
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
