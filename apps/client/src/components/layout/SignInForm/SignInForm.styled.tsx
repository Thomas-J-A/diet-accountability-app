import styled from 'styled-components';
import { Button } from '@radix-ui/themes';

export const SubmitButton = styled(Button)`
  width: 100%;
  cursor: pointer;

  @media (width >= 1024px) {
    width: auto;
  }
`;
