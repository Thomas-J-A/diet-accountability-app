import { ReactElement } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Set up user 'session' and render component into JSDOM
const setup = (jsx: ReactElement) => ({
  user: userEvent.setup(),
  ...render(jsx),
});

export default setup;
