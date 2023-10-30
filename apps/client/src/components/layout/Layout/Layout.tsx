import { Outlet, useLocation } from 'react-router-dom';
import { Grid } from '@radix-ui/themes';
import MainHeader from '../MainHeader/MainHeader';
import Sidebar from '../Sidebar/Sidebar';
import PageHeader from '../PageHeader/PageHeader';
import useMediaQuery from '../../../hooks/useMediaQuery';

const Layout = () => {
  const location = useLocation();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isLandingPage = location.pathname === '/';

  // All mobile pages and landing page on desktop share similar layout
  if (!isDesktop || isLandingPage) {
    return (
      <Grid rows="auto 1fr">
        <MainHeader isDesktop={isDesktop} />
        <Outlet />
      </Grid>
    );
  }

  // All other pages on desktop have a more complex layout with sidebar
  return (
    <Grid rows="auto 1fr" columns="1fr 5fr">
      <Sidebar />
      <PageHeader />
      <Outlet />
    </Grid>
  );
};

export default Layout;
