import styled, { keyframes } from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';
import { Flex, Box } from '@radix-ui/themes';

export const Drawer = styled(Box)``;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

export const DrawerOverlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;
  z-index: 2;
  background-color: rgb(0 0 0 / 75%);

  &[data-state='open'] {
    animation: ${fadeIn} 150ms ease-out;
  }

  &[data-state='closed'] {
    animation: ${fadeOut} 150ms ease-in;
  }
`;

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

export const DrawerContent = styled(Flex)`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 2;
  width: 220px;
  height: 100vh;
  background-color: var(--gray-6);

  &[data-state='open'] {
    animation: ${slideIn} 150ms ease-out;
  }

  &[data-state='closed'] {
    animation: ${slideOut} 150ms ease-in;
  }
`;
