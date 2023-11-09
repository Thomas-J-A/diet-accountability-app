import styled from 'styled-components';
import { ToastContainer as TC } from 'react-toastify';
import { IconButton } from '@radix-ui/themes';

// Override default react-toastify styles to fit theme
export const ToastContainer = styled(TC)`
  /* stylelint-disable selector-class-pattern */
  .Toastify__toast {
    min-height: 0;
    padding: var(--space-3);
    font-family: var(--default-font-family);
    font-size: var(--font-size-2);
    color: var(--gray-6);
    background: white;
  }

  .Toastify__toast-body {
    padding: 0;
    margin: 0;
  }

  .Toastify__progress-bar--success {
    background-color: green;
  }

  .Toastify__progress-bar--info {
    background-color: blue;
  }

  .Toastify__progress-bar--error {
    background-color: red;
  }
`;

export const CloseButton = styled(IconButton)`
  color: var(--gray-6);
  cursor: pointer;
`;
