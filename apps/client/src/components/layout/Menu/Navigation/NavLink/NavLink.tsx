import { useLocation } from 'react-router-dom';
import * as S from './NavLink.styled';

interface INavLink {
  to: string;
  children: React.ReactNode;
}

const NavLink = ({ to, children }: INavLink) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <S.NavMenuLink active={isActive} asChild>
      <S.Link to={to}>{children}</S.Link>
    </S.NavMenuLink>
  );
};

export default NavLink;
