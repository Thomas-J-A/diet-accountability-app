import { render, screen } from '@testing-library/react';
import LandingPage from './LandingPage';

// Mock all child components for a shallow render
jest.mock('./HeroText/HeroText', () => jest.fn().mockReturnValue('hero-text'));
jest.mock('./SignUpForm/SignUpForm', () =>
  jest.fn().mockReturnValue('sign-up-form'),
);
jest.mock('./TestimonialsCarousel/TestimonialsCarousel', () =>
  jest.fn().mockReturnValue('testimonials-carousel'),
);

describe('<LandingPage />', () => {
  // eslint-disable-next-line jest/expect-expect
  it('should render without errors', () => {
    render(<LandingPage />);
  });

  it('should render all child components', () => {
    render(<LandingPage />);

    expect(screen.getByText(/hero-text/i)).toBeInTheDocument();
    expect(screen.getByText(/sign-up-form/i)).toBeInTheDocument();
    expect(screen.getByText(/testimonials-carousel/i)).toBeInTheDocument();
  });
});
