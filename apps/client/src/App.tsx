import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Theme } from '@radix-ui/themes';
// import { ThemeProvider } from 'styled-components';
import CalendarPage from './pages/calendar/CalendarPage/CalendarPage';
import RAQsPage from './pages/RAQs/RAQsPage/RAQsPage';
import LandingPage from './pages/landing/LandingPage/LandingPage';
import StatisticsPage from './pages/statistics/StatisticsPage/StatisticsPage';
import Layout from './components/layout/Layout/Layout';
import Root from './components/layout/Root/Root';
import DefaultError from './components/UI/DefaultError/DefaultError';
import GlobalStyle from './styles/GlobalStyle';
import { ContainerNodeContextProvider } from './contexts/ContainerNodeContext';
// import theme from './styles/theme';

// TODO: Add nested error boundaries
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <DefaultError />,
    children: [
      {
        element: <Layout />,
        children: [
          { index: true, element: <LandingPage /> },
          {
            path: '/calendar',
            element: <CalendarPage />,
          },
          {
            path: '/statistics',
            element: <StatisticsPage />,
          },
          {
            path: '/raqs',
            element: <RAQsPage />,
          },
        ],
      },
    ],
  },
]);

// TODO: <ThemeProvider>
const App = () => {
  return (
    <>
      <GlobalStyle />
      <Theme
        accentColor="mint"
        panelBackground="solid"
        scaling="100%"
        radius="medium"
      >
        <ContainerNodeContextProvider>
          <RouterProvider router={router} />
        </ContainerNodeContextProvider>
      </Theme>
    </>
  );
};

export default App;
