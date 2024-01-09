import { render } from '@testing-library/react';
import TestimonialsCarousel from './TestimonialsCarousel';

// Mock child component
jest.mock('./Slide/Slide', () => jest.fn().mockReturnValue('slide'));

describe('<TestimonialsCarousel />', () => {
  // eslint-disable-next-line jest/expect-expect
  it('should render without errors', () => {
    render(<TestimonialsCarousel />);
  });
});
