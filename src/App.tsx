import { Outlet } from 'react-router-dom';
import { PrimaryBackground } from './App.styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LogoutProvider } from './Providers/LogoutProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';
import Header from './Layout/Header/Header';
import { Footer } from './Layout/Footer/Footer';

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

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <LogoutProvider>
          <ThemeProvider theme={theme}>
            <PrimaryBackground>
              <Header />
              <main style={{ flexGrow: 1 }}>
                <Outlet />
              </main>
              {/* <Footer /> */}
            </PrimaryBackground>
          </ThemeProvider>
        </LogoutProvider>
      </ErrorBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
