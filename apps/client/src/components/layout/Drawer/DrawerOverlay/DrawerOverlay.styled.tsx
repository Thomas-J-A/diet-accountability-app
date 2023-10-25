import styled, { keyframes } from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';

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
  background-color: rgb(0 0 0 / 75%);

  &[data-state='open'] {
    animation: ${fadeIn} 150ms ease-out;
  }

  &[data-state='closed'] {
    animation: ${fadeOut} 150ms ease-in;
  }
`;
