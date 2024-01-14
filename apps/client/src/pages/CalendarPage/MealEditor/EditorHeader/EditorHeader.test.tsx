import { render, screen } from '@testing-library/react';
import * as dateFns from 'date-fns';
import EditorHeader from './EditorHeader';
import useMediaQueryMock from '../../../../hooks/useMediaQuery';
import { useDateInEditor } from '../../../../contexts/DateInEditorContext';
import setup from '../../../../../tests/helpers/setup';

// Mock useMediaQuery hook to control test cases involving mobile/desktop changes
jest.mock('../../../../hooks/useMediaQuery', () =>
  jest.fn().mockReturnValue(false),
);

// Mock DateInEditor context to control date in tests
jest.mock('../../../../contexts/DateInEditorContext', () => ({
  useDateInEditor: jest.fn().mockReturnValue({
    dateInEditor: new Date(2024, 0, 1), // Monday 1st January, 2024
    setDateInEditor: jest.fn(),
  }),
}));

// Mock date-fns methods for test cases involving disabled buttons
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('date-fns', () => ({
  ...jest.requireActual('date-fns'),
  isBefore: jest.fn().mockReturnValue(false),
  isAfter: jest.fn().mockReturnValue(false),
}));

describe('<EditorHeader />', () => {
  // eslint-disable-next-line jest/expect-expect
  it('should render without errors', () => {
    render(<EditorHeader />);
  });

  it('should format date like <Mon 1st Jan> on mobile', () => {
    render(<EditorHeader />);

    const date = 'Mon 1st Jan';
    expect(screen.getByText(date)).toBeInTheDocument();
  });

  it('should format date like <Monday 1st January> on desktop', () => {
    // Simulate a desktop viewport
    (useMediaQueryMock as jest.Mock).mockReturnValueOnce(true);

    render(<EditorHeader />);

    const date = 'Monday 1st January';
    expect(screen.getByText(date)).toBeInTheDocument();
  });

  it('should update date when clicking previous/next buttons', async () => {
    const { setDateInEditor } = useDateInEditor();

    const { user } = setup(<EditorHeader />);

    // Click previous day button
    await user.click(
      screen.getByRole('button', { name: /go to previous day/i }),
    );

    // Expect state setter function to have been called (which in turn updates date in context)
    expect(setDateInEditor).toHaveBeenCalled();

    // Reset mock state ready for next test
    (setDateInEditor as jest.Mock).mockReset();
  });

  it('should disable previous button if earliest date in calendar reached', async () => {
    /**
     * Component disables button depending on value of isPreviousDayBeforeEarliestDate variable
     * which is calculated using the isBefore method, therefore it is mocked for consitency
     */
    (dateFns.isBefore as jest.Mock).mockReturnValueOnce(true);

    // Get reference to mocked value for later assertion
    const { setDateInEditor } = useDateInEditor();

    // Initiate test user and render component
    const { user } = setup(<EditorHeader />);

    // Reference to button which lets user go to previous day
    const previousButton = screen.getByRole('button', {
      name: /go to previous day/i,
    });

    // It should be disabled
    expect(previousButton).toBeDisabled();

    await user.click(previousButton);

    // Should not be called because it is disabled
    expect(setDateInEditor).not.toHaveBeenCalled();

    // Reset mock state ready for next test
    (setDateInEditor as jest.Mock).mockReset();
  });

  it('should disable next button if latest date in calendar reached', async () => {
    (dateFns.isAfter as jest.Mock).mockReturnValueOnce(true);
    const { setDateInEditor } = useDateInEditor();

    const { user } = setup(<EditorHeader />);

    // Fetch next button, ensure it's disabled, click it, then ensure it doesn't fire an event
    const nextButton = screen.getByRole('button', { name: /go to next day/i });
    expect(nextButton).toBeDisabled();
    await user.click(nextButton);
    expect(setDateInEditor).not.toHaveBeenCalled();

    // Reset mock state
    (setDateInEditor as jest.Mock).mockReset();
  });
});
