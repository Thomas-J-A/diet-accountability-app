import styled, { keyframes } from 'styled-components';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';

export const StyledItem = styled(Accordion.Item)`
  margin-top: var(--space-1);

  &:first-child {
    margin-top: 0;
  }
`;

export const StyledHeader = styled(Accordion.Header)`
  all: unset;
  display: flex;
`;

export const StyledTrigger = styled(Accordion.Trigger)`
  all: unset;
  display: flex;
  flex-grow: 1;
  gap: var(--space-2);
  align-items: center;
  justify-content: space-between;
  padding: var(--space-1);
  cursor: default;
  border-radius: var(--radius-2);
`;

export const StyledChevron = styled(ChevronDownIcon)`
  transition: transform 150ms ease-out;

  [data-state='open'] & {
    transform: rotate(180deg);
  }
`;

const slideDown = keyframes`
  from {
    height: 0;
  }

  to {
    height: var(--radix-accordion-content-height);
  }
`;

const slideUp = keyframes`
  from {
    height: var(--radix-accordion-content-height);
  }

  to {
    height: 0;
  }
`;

export const StyledContent = styled(Accordion.Content)`
  padding: 0 var(--space-2);
  overflow: hidden;

  &[data-state='open'] {
    animation: ${slideDown} 150ms ease-out;
  }

  &[data-state='closed'] {
    animation: ${slideUp} 150ms ease-out;
  }
`;
