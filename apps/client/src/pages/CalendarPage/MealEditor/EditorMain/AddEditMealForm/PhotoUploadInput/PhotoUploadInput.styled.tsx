import styled from 'styled-components';

export const StyledFileInput = styled.input`
  /* display: none; */
  border-radius: var(--radius-2);

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--accent-8);
  }
`;
