import { useLocation } from 'react-router-dom';
import { Heading } from '@radix-ui/themes';
import * as S from './PageHeader.styled';

type PathnameOptions = '' | 'Calendar' | 'Statistics' | 'RAQs';

const PageHeader = () => {
  const location = useLocation();

  location.pathname;
  // Format pathname, for example '/calendar' => 'Calendar'
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
    <S.PageHeader justify="center" p="4">
      <Heading size="8">{formattedPathname}</Heading>
    </S.PageHeader>
  );
};

export default PageHeader;
