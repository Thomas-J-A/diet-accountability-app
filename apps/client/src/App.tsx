import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ApolloProvider } from '@apollo/client';
import { Theme } from '@radix-ui/themes';
import { Cross1Icon } from '@radix-ui/react-icons';
import CalendarPage from './pages/calendar/CalendarPage/CalendarPage';
import RAQsPage from './pages/RAQs/RAQsPage/RAQsPage';
import LandingPage from './pages/landing/LandingPage/LandingPage';
import StatisticsPage from './pages/statistics/StatisticsPage/StatisticsPage';
import Layout from './components/layout/Layout/Layout';
import Root from './components/layout/Root/Root';
import PrivateRoute from './components/routing/PrivateRoute/PrivateRoute';
import PublicRoute from './components/routing/PublicRoute/PublicRoute';
import DefaultError from './components/UI/DefaultError/DefaultError';
import { ContainerNodeContextProvider } from './contexts/ContainerNodeContext';
import { ToggleDrawerContextProvider } from './contexts/ToggleDrawerContext';
import createApolloClient from './utils/create-apollo-client';
import GlobalStyle from './styles/GlobalStyle';
import * as S from './App.styled';

// Create client with all Apollo Links and settings configured
const client = createApolloClient();

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
          {
            index: true,
            element: (
              <PublicRoute redirectPath="/calendar">
                <LandingPage />
              </PublicRoute>
            ),
          },
          {
            path: '/calendar',
            element: (
              <PrivateRoute redirectPath="/">
                <CalendarPage />
              </PrivateRoute>
            ),
          },
          {
            path: '/statistics',
            element: (
              <PrivateRoute redirectPath="/">
                <StatisticsPage />
              </PrivateRoute>
            ),
          },
          {
            path: '/raqs',
            element: (
              <PrivateRoute redirectPath="/">
                <RAQsPage />
              </PrivateRoute>
            ),
          },
        ],
      },
    ],
  },
]);

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
        <S.ToastContainer
          autoClose={3000}
          position={toast.POSITION.TOP_CENTER}
          closeButton={({ closeToast }) => (
            <S.CloseButton size="1" variant="ghost" onClick={closeToast}>
              <Cross1Icon height="12" width="12" />
            </S.CloseButton>
          )}
        />
        <ContainerNodeContextProvider>
          <ToggleDrawerContextProvider>
            <ApolloProvider client={client}>
              <RouterProvider router={router} />
            </ApolloProvider>
          </ToggleDrawerContextProvider>
        </ContainerNodeContextProvider>
      </Theme>
    </>
  );
};

export default App;
