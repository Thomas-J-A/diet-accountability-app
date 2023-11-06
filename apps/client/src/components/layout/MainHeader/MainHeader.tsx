import { Heading } from '@radix-ui/themes';
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
      <S.MainHeader justify="between" align="center" p="3">
        <Heading size="6">Plate2Progress</Heading>
        <Drawer />
      </S.MainHeader>
    );
  }

  // Desktop landing page
  return (
    <S.MainHeader justify="between" align="center" p="3">
      <Heading size="6">Plate2Progress</Heading>
      <SignInForm />
    </S.MainHeader>
  );
};

export default MainHeader;
