import { Heading } from '@radix-ui/themes';
import Menu from '../Menu/Menu';
import * as S from './Sidebar.styled';

const Sidebar = () => {
  return (
    <S.Sidebar direction="column">
      <S.Logo p="3">
        <Heading align="center" size="5">
          Plate2Progress
        </Heading>
      </S.Logo>
      <Menu />
    </S.Sidebar>
  );
};

export default Sidebar;
