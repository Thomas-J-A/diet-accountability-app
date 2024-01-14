import { render, screen } from '@testing-library/react';
import * as ApolloClientMock from '@apollo/client';
import useMediaQueryMock from '../../hooks/useMediaQuery';
import CalendarPage from './CalendarPage';

// Mock child components for a shallow render
jest.mock('./MealEditor/MealEditor', () =>
  jest.fn().mockReturnValue(<div>Meal Editor</div>),
);
jest.mock('./Calendar/Calendar', () =>
  jest.fn().mockReturnValue(<div>Calendar</div>),
);
jest.mock('../../components/UI/AdsCarousel/AdsCarousel', () =>
  jest.fn().mockReturnValue(<div>Ads Carousel</div>),
);

// Mock useQuery hook
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn().mockReturnValue({
    loading: true,
    error: undefined,
    data: undefined,
  }),
}));

// Mock useMediaQuery hook
jest.mock('../../hooks/useMediaQuery', () => jest.fn().mockReturnValue(false));

describe('<CalendarPage />', () => {
  // eslint-disable-next-line jest/expect-expect
  it('should render without errors', () => {
    render(<CalendarPage />);
  });

  it('should initially show a loading message', () => {
    render(<CalendarPage />);
    expect(screen.getByText(/hold on one second.../i)).toBeInTheDocument();
  });

  it('should render all child components', () => {
    // Mock useQuery response to simulate a settled state
    (ApolloClientMock.useQuery as jest.Mock).mockReturnValueOnce({
      loading: false,
      error: undefined,
      data: {},
    });

    render(<CalendarPage />);

    expect(screen.getByText(/meal editor/i)).toBeInTheDocument();
    expect(screen.getByText(/calendar/i)).toBeInTheDocument();
    expect(screen.getByText(/ads carousel/i)).toBeInTheDocument();
  });

  it('should display ads on top of page on mobile', () => {
    // Mock useQuery response to simulate a settled state
    (ApolloClientMock.useQuery as jest.Mock).mockReturnValueOnce({
      loading: false,
      error: undefined,
      data: {},
    });

    render(<CalendarPage />);

    // Get references to ads and calendar DOM nodes
    const adsCarousel = screen.getByText(/ads carousel/i);
    const calendar = screen.getByText(/calendar/i);

    /**
     * Expect ads to come before calendar in UI
     * Jest doesn't seem to have a convenient matcher for this type of assertion, thus it is
     * tested using a Bitwise operation (Bitwise '&') and compared with a Node constant operand
     */
    expect(
      adsCarousel.compareDocumentPosition(calendar) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeGreaterThan(0);
  });

  it('should display ads after calendar on desktop', () => {
    // Mock useMediaQuery response to simulate a desktop screen width
    (useMediaQueryMock as jest.Mock).mockReturnValueOnce(true);

    // Mock useQuery response to simulate a settled state
    (ApolloClientMock.useQuery as jest.Mock).mockReturnValueOnce({
      loading: false,
      error: undefined,
      data: {},
    });

    render(<CalendarPage />);

    const adsCarousel = screen.getByText(/ads carousel/i);
    const calendar = screen.getByText(/calendar/i);

    expect(
      adsCarousel.compareDocumentPosition(calendar) &
        Node.DOCUMENT_POSITION_PRECEDING,
    ).toBeGreaterThan(0);
  });

  it('should display an error message if data fetching fails', () => {
    // Mock useQuery response to simulate an error state
    (ApolloClientMock.useQuery as jest.Mock).mockReturnValueOnce({
      loading: false,
      error: new Error(),
      data: undefined,
    });

    render(<CalendarPage />);

    expect(screen.getByText(/internal server error/i)).toBeInTheDocument();
  });
});
