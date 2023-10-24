import styled, { keyframes } from 'styled-components';
import { Flex } from '@radix-ui/themes';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(100%);
  }
`;

export const Drawer = styled(Flex)`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 200px;
  background-color: var(--gray-6);

  &[data-state='open'] {
    animation: ${slideIn} 150ms ease-out;
  }

  &[data-state='closed'] {
    animation: ${slideOut} 150ms ease-in;
  }
`;
