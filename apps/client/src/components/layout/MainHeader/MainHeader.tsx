import { Heading, Text } from '@radix-ui/themes';
import Drawer from '../Drawer/Drawer';
import * as S from './MainHeader.styled';

interface IMainHeader {
  isDesktop: boolean;
}

const MainHeader = ({ isDesktop }: IMainHeader) => {
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
      <Text>Sign in fields here</Text>
    </S.MainHeader>
  );
};

export default MainHeader;
