import { Link } from 'react-router-dom';
import { Flex, Heading } from '@radix-ui/themes';
import Drawer from '../Drawer/Drawer';
import SignInForm from '../SignInForm/SignInForm';
import { useAuthContext } from '../../../contexts/AuthContext';
import * as S from './MainHeader.styled';

interface MainHeaderProps {
  isDesktop: boolean;
}

const MainHeader = ({ isDesktop }: MainHeaderProps) => {
  const { isAuthenticated } = useAuthContext();

  return (
    <Flex
      justify="between"
      align="center"
      p={{ initial: '3', md: '4' }}
      asChild
    >
      <S.MainHeader>
        <Link to={isAuthenticated ? '/calendar' : '/'}>
          <Heading size={{ initial: '6', md: '7' }}>Plate2Progress</Heading>
        </Link>
        {isDesktop ? <SignInForm /> : <Drawer />}
      </S.MainHeader>
    </Flex>
  );
};

export default MainHeader;
