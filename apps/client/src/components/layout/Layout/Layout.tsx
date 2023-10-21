import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import useMediaQuery from '../../../hooks/useMediaQuery';

// TODO: Get min-width value from RadixUI token
const Layout = () => {
  const location = useLocation();
  const isDesktop = useMediaQuery('(min-width: 960px)');
  const isNotLandingPage = location.pathname !== '/';

  return (
    <div>
      {isDesktop && isNotLandingPage && <Sidebar />}
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
