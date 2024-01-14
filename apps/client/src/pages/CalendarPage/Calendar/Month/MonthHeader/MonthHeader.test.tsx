import { render, screen } from '@testing-library/react';
import MonthHeader from './MonthHeader';

describe('<MonthHeader />', () => {
  // eslint-disable-next-line jest/expect-expect
  it('should render without errors', () => {
    render(<MonthHeader year={2024} month={0} />);
  });

  it('should format month and year', () => {
    render(<MonthHeader year={2024} month={6} />);

    expect(screen.getByText("JUL '24")).toBeInTheDocument();
  });

  it('should display an attributed image on each month', () => {
    // Note: photo is rendered as a background image not with an <img /> tag
    render(<MonthHeader year={2024} month={0} />);

    expect(screen.getByText(/elisa/i)).toBeInTheDocument();
  });
});
