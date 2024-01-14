import { render, screen } from '@testing-library/react';
import Calendar from './Calendar';
import getTwelveMonthsEarlier from '../../../utils/get-twelve-months-earlier';
import ScrollToTodayButton from './ScrollToTodayButton/ScrollToTodayButton';

// Mock useEffect hook since it doesn't need to run in test suite
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
}));

// Mock scroll to today button
jest.mock('./ScrollToTodayButton/ScrollToTodayButton', () =>
  jest.fn().mockReturnValue(<div>Today</div>),
);

describe('<Calendar />', () => {
  const today = new Date(2024, 0, 1);
  const startDate = getTwelveMonthsEarlier(today);

  // eslint-disable-next-line jest/expect-expect
  it('should render without errors', () => {
    render(<Calendar today={today} startDate={startDate} dayEvents={[]} />);
  });

  it('should render one year previous, then display a message', () => {
    render(<Calendar today={today} startDate={startDate} dayEvents={[]} />);

    const oneYearPrevious = "JAN '23";
    expect(screen.getByText(oneYearPrevious)).toBeInTheDocument();

    const oneYearOneMonthPrevious = "DEC '22";
    expect(screen.queryByText(oneYearOneMonthPrevious)).not.toBeInTheDocument();

    const previousLimitReachedMsg = /who even cares what you ate here?/i;
    expect(screen.getByText(previousLimitReachedMsg)).toBeInTheDocument();
  });

  it('should render six months later, then display a message', () => {
    render(<Calendar today={today} startDate={startDate} dayEvents={[]} />);

    const sixMonthsLater = "JUL '24";
    expect(screen.getByText(sixMonthsLater)).toBeInTheDocument();

    const sevenMonthsLater = "AUG '24";
    expect(screen.queryByText(sevenMonthsLater)).not.toBeInTheDocument();

    const laterLimitReachedMsg = /end of the road, Eager McBeaver/i;
    expect(screen.getByText(laterLimitReachedMsg)).toBeInTheDocument();
  });

  it('should render a back-to-today button', () => {
    render(<Calendar today={today} startDate={startDate} dayEvents={[]} />);

    expect(ScrollToTodayButton).toHaveBeenCalled();
  });
});
