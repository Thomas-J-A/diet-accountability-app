import { Flex, Heading } from '@radix-ui/themes';
import Drawer from '../Drawer/Drawer';
import SignInForm from '../SignInForm/SignInForm';
import * as S from './MainHeader.styled';

interface MainHeaderProps {
  isDesktop: boolean;
}

const MainHeader = ({ isDesktop }: MainHeaderProps) => {
  // All mobile pages
  if (!isDesktop) {
    return (
      <Flex justify="between" align="center" p="3" asChild>
        <S.MainHeader>
          <Heading size="6">Plate2Progress</Heading>
          <Drawer />
        </S.MainHeader>
      </Flex>
    );
  }

  // Desktop landing page
  return (
    <Flex justify="between" align="center" p="3" asChild>
      <S.MainHeader>
        <Heading size="6">Plate2Progress</Heading>
        <SignInForm />
      </S.MainHeader>
    </Flex>
  );
};

export default MainHeader;
