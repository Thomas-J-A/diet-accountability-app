import styled from 'styled-components';
import { Button } from '@radix-ui/themes';

export const SubmitButton = styled(Button)`
  width: 100%;
  cursor: pointer;

  @media (width >= 1024px) {
    width: 200px;
  }
`;

export const AbsolutelyPositionedError = styled.div`
  @media (width >= 1024px) {
    position: absolute;
    top: var(--space-7);
  }
`;
