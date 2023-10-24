import { useLocation } from 'react-router-dom';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { Heading, Text } from '@radix-ui/themes';
import ToggleDrawerButton from './ToggleDrawerButton/ToggleDrawerButton';
import * as S from './Header.styled';

type PathnameOptions = '' | 'Calendar' | 'Statistics' | 'RAQs';

const Header = () => {
  const location = useLocation();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isLandingPage = location.pathname === '/';

  // All page's headers on mobile
  if (!isDesktop) {
    return (
      <S.Header justify="between" align="center" p="3">
        <Heading size="6">Plate2Progress</Heading>
        <ToggleDrawerButton />
      </S.Header>
    );
  }

  // Landing page's header on desktop - differs from rest of pages
  if (isLandingPage) {
    return (
      <S.Header justify="between" align="center" p="3">
        <Heading size="6">Plate2Progress</Heading>
        <Text>Sign in fields here</Text>
      </S.Header>
    );
  }

  // All other page's headers on desktop
  // First, format pathname, for example '/calendar' => 'Calendar'
  let formattedPathname: PathnameOptions;

  switch (location.pathname) {
    case '/calendar':
      formattedPathname = 'Calendar';
      break;
    case '/statistics':
      formattedPathname = 'Statistics';
      break;
    case '/raqs':
      formattedPathname = 'RAQs';
      break;
    default:
      formattedPathname = '';
  }

  return (
    <S.Header justify="center" p="3">
      <Heading size="6">{formattedPathname}</Heading>
    </S.Header>
  );
};

export default Header;
