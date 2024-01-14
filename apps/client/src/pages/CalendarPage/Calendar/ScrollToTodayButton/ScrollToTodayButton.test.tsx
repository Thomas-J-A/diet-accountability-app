import { render, screen } from '@testing-library/react';
import ScrollToTodayButton from './ScrollToTodayButton';
import setup from '../../../../../tests/helpers/setup';

describe('<ScrollToTodayButton />', () => {
  // eslint-disable-next-line jest/expect-expect
  it('should render without errors', () => {
    render(<ScrollToTodayButton onClick={jest.fn()} />);
  });

  it('should call handler when button is clicked', async () => {
    const clickHandler = jest.fn();
    const { user } = setup(<ScrollToTodayButton onClick={clickHandler} />);

    await user.click(screen.getByRole('button', { name: /today/i }));

    expect(clickHandler).toHaveBeenCalled();
  });
});
