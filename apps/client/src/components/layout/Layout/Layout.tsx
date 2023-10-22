import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import * as S from './Layout.styled';

// Landing page has same grid on mobile and desktop
// Other pages have a different grid to factor in sidebar component on desktop
const Layout = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  if (isLandingPage) {
    return (
      <S.Layout rows="auto 1fr">
        <Header />
        <Outlet />
      </S.Layout>
    );
  }

  return (
    <S.Layout rows="auto 1fr" columns={{ initial: '1', md: 'auto 1fr' }}>
      <Sidebar />
      <Header />
      <Outlet />
    </S.Layout>
  );
};

export default Layout;
