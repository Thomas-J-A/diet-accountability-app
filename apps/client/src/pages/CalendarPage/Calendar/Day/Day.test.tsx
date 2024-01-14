import { render, screen } from '@testing-library/react';
import Day from './Day';
import { useDateInEditor } from '../../../../contexts/DateInEditorContext';
import setup from '../../../../../tests/helpers/setup';

// Mock useMediaQuery hook
jest.mock('../../../../hooks/useMediaQuery', () =>
  jest.fn().mockReturnValue(false),
);

// Mock DateInEditor context
jest.mock('../../../../contexts/DateInEditorContext', () => ({
  useDateInEditor: jest.fn().mockReturnValue({
    dateInEditor: new Date(),
    setDateInEditor: jest.fn(),
  }),
}));

describe('<Day />', () => {
  // eslint-disable-next-line jest/expect-expect
  it('should render without errors', () => {
    render(<Day day={1} date={new Date()} />);
  });

  it('should display the date of the month', () => {
    render(<Day day={7} date={new Date()} />);

    expect(screen.getByText('7')).toBeInTheDocument();
  });

  it('should update date in editor when clicked', async () => {
    const day = 1;
    const date = new Date(2000, 1, 1);
    const { setDateInEditor } = useDateInEditor();
    const { user } = setup(<Day day={day} date={date} />);

    // Click day in calendar
    await user.click(screen.getByText(day));

    expect(setDateInEditor).toHaveBeenCalledWith(date);
  });
});
