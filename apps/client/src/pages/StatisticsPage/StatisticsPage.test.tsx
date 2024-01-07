import { render, screen } from '@testing-library/react';
import * as ApolloClientMock from '@apollo/client';
import StatisticsPage from './StatisticsPage';

/**
 * Note: the useQuery hook in this component takes two Date objects as variables
 * which are difficult to mock using Apollo Client's MockedProvider API (the variables
 * msut be exact matches between the 'mock' prop and component file, but timestamps
 * will be very slightly different). Therefore, useQuery hook is mocked using
 * Jest instead of the canonical way in this test suite
 */

// Mock all child components for a shallow render
jest.mock('./Charts/Charts', () => jest.fn().mockReturnValue('charts'));
jest.mock('./TimeframeSwitcher/TimeframeSwitcher', () =>
  jest.fn().mockReturnValue('timeframe-switcher'),
);
jest.mock('./MealsRecorded/MealsRecorded', () =>
  jest.fn().mockReturnValue('meals-recorded'),
);
jest.mock('../../components/UI/AdsCarousel/AdsCarousel', () =>
  jest.fn().mockReturnValue('ads-carousel'),
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

describe('<StatisticsPage />', () => {
  // eslint-disable-next-line jest/expect-expect
  it('should render without errors', () => {
    render(<StatisticsPage />);
  });

  it('should initially display a loading message', () => {
    render(<StatisticsPage />);

    expect(
      screen.getByText(/loading some sick charts.../i),
    ).toBeInTheDocument();
  });

  it('should display a page title and description', () => {
    // Override default mock to simulate state where data has successfully been returned
    (ApolloClientMock.useQuery as jest.Mock).mockReturnValueOnce({
      loading: false,
      error: undefined,
      data: {},
    });

    render(<StatisticsPage />);

    expect(screen.getByText(/tuck into some pie/i)).toBeInTheDocument();
    expect(
      screen.getByText(/some visual data for the curious/i),
    ).toBeInTheDocument();
  });

  it('should render all child components', () => {
    (ApolloClientMock.useQuery as jest.Mock).mockReturnValueOnce({
      loading: false,
      error: undefined,
      data: {},
    });

    render(<StatisticsPage />);

    expect(screen.getAllByText(/charts/i)[1]).toBeInTheDocument(); // 'Charts' also appears in page title
    expect(screen.getByText(/timeframe-switcher/i)).toBeInTheDocument();
    expect(screen.getByText(/meals-recorded/i)).toBeInTheDocument();
    expect(screen.getByText(/ads-carousel/i)).toBeInTheDocument();
  });

  it('should display an error message if data fetching fails', () => {
    // Override default mock to simulate state where error has occured during request
    (ApolloClientMock.useQuery as jest.Mock).mockReturnValueOnce({
      loading: false,
      error: new Error(),
      data: undefined,
    });

    render(<StatisticsPage />);

    expect(screen.getByText(/internal server error/i)).toBeInTheDocument();
  });
});
