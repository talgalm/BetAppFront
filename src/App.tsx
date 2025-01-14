import { Outlet } from "react-router-dom";
import { PrimaryBackground } from "./App.styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LogoutProvider } from "./Providers/LogoutProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "react-error-boundary";
import Header from "./Layout/Header/Header";
import { Footer } from "./Layout/Footer/Footer";

// Fallback UI for ErrorBoundary
const ErrorFallback = ({ error, resetErrorBoundary }: any) => {
  return (
    <div role="alert" style={{ padding: "20px", textAlign: "center" }}>
      <h2>Something went wrong</h2>
      <p style={{ color: "red" }}>{error.message}</p>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  );
};

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <LogoutProvider>
          <PrimaryBackground>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
              }}
            >
              <Header />
              <main style={{ flexGrow: 1 }}>
                <Outlet />
              </main>
              <Footer /> 
            </div>
          </PrimaryBackground>
        </LogoutProvider>
      </ErrorBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
