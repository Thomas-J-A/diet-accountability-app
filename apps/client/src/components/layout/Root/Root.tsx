import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import * as S from './Root.styled';

// 'id' is used so Drawer can use Root as a portal target
const Root = () => {
  return (
    <S.Root id="container" rows="1fr auto">
      <Outlet />
      <Footer />
    </S.Root>
  );
};

export default Root;
