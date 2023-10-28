import { Outlet, useLocation } from 'react-router-dom';
import MainHeader from '../MainHeader/MainHeader';
import Sidebar from '../Sidebar/Sidebar';
import PageHeader from '../PageHeader/PageHeader';
import useMediaQuery from '../../../hooks/useMediaQuery';
import * as S from './Layout.styled';

const Layout = () => {
  const location = useLocation();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isLandingPage = location.pathname === '/';

  // All mobile pages and landing page on desktop share similar layout
  if (!isDesktop || isLandingPage) {
    return (
      <S.Layout rows="auto 1fr">
        <MainHeader isDesktop={isDesktop} />
        <Outlet />
      </S.Layout>
    );
  }

  // All other pages on desktop have a more complex layout with sidebar
  return (
    <S.Layout rows="auto 1fr" columns="1fr 4fr">
      <Sidebar />
      <PageHeader />
      <Outlet />
    </S.Layout>
  );
};

export default Layout;
