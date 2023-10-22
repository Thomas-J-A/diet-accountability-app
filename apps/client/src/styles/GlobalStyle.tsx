import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  ${normalize}
  /* *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  } */
`;

export default GlobalStyle;
