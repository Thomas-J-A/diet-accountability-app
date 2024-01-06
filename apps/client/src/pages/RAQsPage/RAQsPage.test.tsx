import { render, screen } from '@testing-library/react';
import RAQsPage from './RAQsPage';
import QuestionsAccordionMock from './QuestionsAccordion/QuestionsAccordion';
import AdsCarouselMock from '../../components/UI/AdsCarousel/AdsCarousel';

// Mock all child components for a shallow render
jest.mock('./QuestionsAccordion/QuestionsAccordion', () =>
  jest.fn().mockReturnValue('mocked'),
);
jest.mock('../../components/UI/AdsCarousel/AdsCarousel', () =>
  jest.fn().mockReturnValue('mocked'),
);
jest.mock('../../components/UI/Ads/SuitYourself', () =>
  jest.fn().mockReturnValue('mocked'),
);

describe('<RAQsPage />', () => {
  // eslint-disable-next-line jest/expect-expect
  it('should render without errors', () => {
    render(<RAQsPage />);
  });

  it('should display a page title and description', () => {
    render(<RAQsPage />);

    expect(screen.getByText(/rarely asked questions/i)).toBeInTheDocument();
    expect(
      screen.getByText(/welcome to our raqs section/i),
    ).toBeInTheDocument();
  });

  it('should render ad and question components', () => {
    render(<RAQsPage />);

    expect(QuestionsAccordionMock).toHaveBeenCalled();
    expect(AdsCarouselMock).toHaveBeenCalled();
  });
});
