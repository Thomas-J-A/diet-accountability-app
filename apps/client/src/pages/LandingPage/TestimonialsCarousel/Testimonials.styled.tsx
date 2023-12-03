import styled from 'styled-components';
import { Box } from '@radix-ui/themes';

export const StyledBox = styled(Box)`
  width: 100%;
  overflow: hidden;

  @media (width >= 1024px) {
    grid-column: 1 / span 2;
  }
`;
