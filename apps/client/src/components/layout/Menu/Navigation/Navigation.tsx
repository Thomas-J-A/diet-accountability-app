import * as NavMenu from '@radix-ui/react-navigation-menu';
import { Flex } from '@radix-ui/themes';
import {
  CalendarIcon,
  BarChartIcon,
  QuestionMarkCircledIcon,
} from '@radix-ui/react-icons';
import NavLink from './NavLink/NavLink';
import * as S from './Navigation.styled';

const Navigation = () => {
  return (
    <Flex direction="column">
      <NavMenu.Root orientation="vertical">
        <S.NavMenuList>
          <S.NavMenuItem>
            <NavLink to="/calendar">
              <Flex align="center" gap="2">
                <CalendarIcon /> Calendar
              </Flex>
            </NavLink>
          </S.NavMenuItem>
          <S.NavMenuItem>
            <NavLink to="/statistics">
              <Flex align="center" gap="2">
                <BarChartIcon /> Statistics
              </Flex>
            </NavLink>
          </S.NavMenuItem>
          <S.NavMenuItem>
            <NavLink to="/raqs">
              <Flex align="center" gap="2">
                <QuestionMarkCircledIcon /> RAQs
              </Flex>
            </NavLink>
          </S.NavMenuItem>
        </S.NavMenuList>
      </NavMenu.Root>
    </Flex>
  );
};

export default Navigation;
