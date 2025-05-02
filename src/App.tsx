import { Outlet } from 'react-router-dom';
import { PrimaryBackground } from './App.styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './Providers/AuthProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';
import Header from './Layout/Header/Header';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

import ErrorFallback from './Errors/ErrorHandler';
import { ThemeProvider } from '@mui/material';
import theme from './Theme/theme';

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
        refetchOnMount: false,
        staleTime: 60000,
      },
    },
  });

  const localStoragePersister = createSyncStoragePersister({
    storage: window.localStorage,
  });

  persistQueryClient({
    queryClient,
    persister: localStoragePersister,
  });
  // access token + refresh token (need 2 to handle)
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <AuthProvider>
            <GoogleOAuthProvider clientId="754492313540-4kl64as5d01muqmgaudat470uaq41hv3.apps.googleusercontent.com">
              <PrimaryBackground>
                <Header />
                <main style={{ flexGrow: 1 }}>
                  <Outlet />
                </main>
                {/* <Footer /> */}
              </PrimaryBackground>
            </GoogleOAuthProvider>
          </AuthProvider>
        </ErrorBoundary>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
