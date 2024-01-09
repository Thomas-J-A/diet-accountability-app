import { render, screen } from '@testing-library/react';
import HeroText from './HeroText';

describe('<HeroText />', () => {
  // eslint-disable-next-line jest/expect-expect
  it('should render without errors', () => {
    render(<HeroText />);
  });

  it('should display a heading and subheading', () => {
    render(<HeroText />);

    expect(
      screen.getByRole('heading', { name: /capture every meal/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /take photos, stay on track/i }),
    ).toBeInTheDocument();
  });
});
