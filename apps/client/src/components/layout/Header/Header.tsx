// import { useLocation } from 'react-router-dom';
// import useMediaQuery from '../../../hooks/useMediaQuery';
import { Heading } from '@radix-ui/themes';
import * as S from './Header.styled';

// On mobile - logo, hamburger icon
// On landing - logo, sign in form
// On rest - name of page
const Header = () => {
  // const location = useLocation();
  // const isDesktop = useMediaQuery('(min-width: 960px)');
  // const isLandingPage = location.pathname === '/';

  return (
    <S.Header p="2" height="auto">
      <Heading size="5">Plate2Progress</Heading>
    </S.Header>
  );
};

export default Header;
