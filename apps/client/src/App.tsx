import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Theme } from '@radix-ui/themes';
import { Cross1Icon } from '@radix-ui/react-icons';
import CalendarPage from './pages/CalendarPage/CalendarPage';
import RAQsPage from './pages/RAQsPage/RAQsPage';
import LandingPage from './pages/LandingPage/LandingPage';
import StatisticsPage from './pages/StatisticsPage/StatisticsPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Layout from './components/layout/Layout/Layout';
import Root from './components/layout/Root/Root';
import PrivateRoute from './components/routing/PrivateRoute/PrivateRoute';
import PublicRoute from './components/routing/PublicRoute/PublicRoute';
import DefaultError from './components/UI/DefaultError/DefaultError';
import { ContainerNodeContextProvider } from './contexts/ContainerNodeContext';
import { ToggleDrawerContextProvider } from './contexts/ToggleDrawerContext';
import { AuthContextProvider } from './contexts/AuthContext';
import GlobalStyle from './styles/GlobalStyle';
import * as S from './App.styled';

// TODO: Add nested error boundaries
// AuthContext declared here because it must be below React-Router
// and above Apollo Client in component tree
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    ),
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
      {
        path: '*',
        element: <NotFoundPage />,
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
            <RouterProvider router={router} />
          </ToggleDrawerContextProvider>
        </ContainerNodeContextProvider>
      </Theme>
    </>
  );
};

export default App;
