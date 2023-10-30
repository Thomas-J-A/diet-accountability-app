import styled from 'styled-components';
import * as NavMenu from '@radix-ui/react-navigation-menu';

export const NavMenuList = styled(NavMenu.List)`
  padding: 0;
  margin: 0;
  list-style-type: none;
`;

export const NavMenuItem = styled(NavMenu.Item)`
  &:not(:last-child) {
    margin-bottom: var(--space-1);
  }
`;
