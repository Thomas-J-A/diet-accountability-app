import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import NotFoundPage from './NotFoundPage';
import * as AuthContextMock from '../../contexts/AuthContext';

// Mock useLocation hook used in component
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn().mockReturnValue({ pathname: '/foo' }),
}));

jest.mock('../../contexts/AuthContext', () => ({
  useAuthContext: jest.fn().mockReturnValue({ isAuthenticated: false }),
}));

describe('<NotFoundPage />', () => {
  // eslint-disable-next-line jest/expect-expect
  it('should render without errors', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );
  });

  it('should display the (incorrect) pathname', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );

    expect(screen.getByText(/foo/i)).toBeInTheDocument();
  });

  it('should offer some helpful links if authenticated', () => {
    // Mock an authed user
    (AuthContextMock.useAuthContext as jest.Mock).mockReturnValueOnce({
      isAuthenticated: true,
    });

    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: /calendar/i })).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: /statistics/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: /rarely asked questions/i }),
    ).toBeInTheDocument();
  });

  it('should display a sign in link if unauthenticated', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument();
  });
});
