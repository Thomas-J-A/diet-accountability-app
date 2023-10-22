import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import * as S from './Root.styled';

const Root = () => {
  return (
    <S.Root rows="1fr auto">
      <Outlet />
      <Footer />
    </S.Root>
  );
};

export default Root;
