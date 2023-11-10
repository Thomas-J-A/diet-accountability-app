import { Link } from 'react-router-dom';
import { Heading, Separator } from '@radix-ui/themes';
import Menu from '../Menu/Menu';
import * as S from './Sidebar.styled';

const Sidebar = () => {
  return (
    <S.Sidebar direction="column" gap="3" p="3">
      <Link to="/calendar">
        <Heading align="center" size="6">
          Plate2Progress
        </Heading>
      </Link>
      <Separator size="4" />
      <Menu />
    </S.Sidebar>
  );
};

export default Sidebar;
