import * as S from './Sidebar.styled';
import { Heading, Text } from '@radix-ui/themes';

const Sidebar = () => {
  return (
    <S.Sidebar p="2" display={{ initial: 'none', md: 'block' }}>
      <Heading>Logo</Heading>
      <Text>Navigation</Text>
    </S.Sidebar>
  );
};

export default Sidebar;
