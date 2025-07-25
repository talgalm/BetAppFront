import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './language/i18n';
import Home from './pages/home/Home';
import NewBetForm from './pages/new-bet/NewBet.form';
import WelcomePage from './pages/auth/welcome-page/WelcomePage';
import VerifyEmail from './pages/auth/verify-email/VerifyEmail';
import AuthCallback from './providers/AuthCallback';
import BetPage from './pages/bet/BetPage';
import Profile from './pages/profile/Profile';
import PersonalForm from '@pages/personal/PersonalPageForm';
import Settings from '@pages/settings/SettingsPage';
import Support from '@pages/support/SupportPage';

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
        path: '/personal',
        element: <PersonalForm />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
      {
        path: '/support',
        element: <Support />,
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
