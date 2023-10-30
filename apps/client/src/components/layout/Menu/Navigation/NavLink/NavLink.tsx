import { useLocation } from 'react-router-dom';
import { useToggleDrawer } from '../../../../../contexts/ToggleDrawerContext';
import * as S from './NavLink.styled';

interface INavLink {
  to: string;
  children: React.ReactNode;
}

const NavLink = ({ to, children }: INavLink) => {
  const [, setIsOpen] = useToggleDrawer();
  const location = useLocation();
  const isActive = location.pathname === to;

  const closeDrawer = () => {
    setIsOpen(false);
  };

  return (
    <S.NavMenuLink active={isActive} asChild>
      <S.Link to={to} onClick={closeDrawer}>
        {children}
      </S.Link>
    </S.NavMenuLink>
  );
};

export default NavLink;
