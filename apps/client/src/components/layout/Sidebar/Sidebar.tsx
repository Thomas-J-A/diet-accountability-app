import { Heading, Text } from '@radix-ui/themes';
import * as S from './Sidebar.styled';

const Sidebar = () => {
  return (
    <S.Sidebar direction="column">
      <S.Logo px="3" py="4">
        <Heading size="5">Plate2Progress</Heading>
      </S.Logo>
      <S.Nav direction="column" justify="between" grow="1" p="3">
        <Text>Navigation</Text>
        <Text>Signed in as Aurelius</Text>
      </S.Nav>
    </S.Sidebar>
  );
};

export default Sidebar;
