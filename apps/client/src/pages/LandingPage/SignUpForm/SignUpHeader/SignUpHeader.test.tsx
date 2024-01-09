import { render, screen } from '@testing-library/react';
import SignUpHeader from './SignUpHeader';

describe('<SignUpHeader />', () => {
  // eslint-disable-next-line jest/expect-expect
  it('should render without errors', () => {
    render(<SignUpHeader />);
  });

  it('should display a heading', () => {
    render(<SignUpHeader />);

    expect(
      screen.getByRole('heading', { name: /register an account/i }),
    ).toBeInTheDocument();
  });
});
