import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './language/i18n';
import Home from './pages/Home/Home';
import NewBetForm from './pages/NewBet/NewBet.form';
import WelcomePage from './pages/AuthPage/WelcomePage/WelcomePage';

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
        path: '/new-bet',
        element: <NewBetForm />,
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
