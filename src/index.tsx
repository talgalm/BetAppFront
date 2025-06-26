import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './language/i18n';
import Home from './pages/Home/Home';
import NewBetForm from './pages/NewBet/NewBet.form';
import WelcomePage from './pages/Auth/WelcomePage/WelcomePage';
import VerifyEmail from './pages/Auth/VerifyEmail/VerifyEmail';
import AuthCallback from './providers/AuthCallback';
import BetPage from './pages/Bet/BetPage';
import Profile from './pages/Profile/Profile';

export const pagesRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <WelcomePage />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/new-bet',
        element: <NewBetForm />,
      },
      {
        path: '/verify-email',
        element: <VerifyEmail />,
      },
      {
        path: '/auth/success',
        element: <AuthCallback />,
      },
      {
        path: '/bet/:id',
        element: <BetPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <RouterProvider router={pagesRouter} />
  </React.StrictMode>
);
