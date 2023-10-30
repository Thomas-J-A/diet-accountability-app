import styled from 'styled-components';
import * as NavMenu from '@radix-ui/react-navigation-menu';
import { Link as RouterLink } from 'react-router-dom';

export const NavMenuLink = styled(NavMenu.Link)`
  &[data-active] {
    background-color: var(--accent-6);
  }
`;

export const Link = styled(RouterLink)`
  display: block;
  padding: var(--space-1);
  font-size: var(--font-size-4);
  color: var(--gray-12);
  text-decoration: none;
  list-style-type: none;
  border-radius: var(--radius-2);

  &:hover {
    background-color: var(--accent-8);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--accent-8);
  }
`;
