import { render, screen } from '@testing-library/react';
import Month from './Month';

// Mock child components for a shallow render
jest.mock('./MonthHeader/MonthHeader', () =>
  jest.fn().mockReturnValue(<div>Month Header</div>),
);

describe('<Month />', () => {
  // eslint-disable-next-line jest/expect-expect
  it('should render without errors', () => {
    render(
      <Month year={2024} month={0} dayEvents={[]} isCurrentMonth={false} />,
    );
  });

  it('should render a dynamic number of days', () => {
    render(
      <Month year={2024} month={3} dayEvents={[]} isCurrentMonth={false} />,
    );

    // April (3rd month of year when zero-indexed) should have 30 days
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.queryByText('31')).not.toBeInTheDocument();
  });

  it('should display 29th Feb on leap years', () => {
    // 2024 is a leap year
    render(
      <Month year={2024} month={1} dayEvents={[]} isCurrentMonth={false} />,
    );

    expect(screen.getByText('29')).toBeInTheDocument();
  });

  it('should not display 29th Feb on non-leap years', () => {
    render(
      <Month year={2023} month={1} dayEvents={[]} isCurrentMonth={false} />,
    );

    expect(screen.queryByText('29')).not.toBeInTheDocument();
  });
});
