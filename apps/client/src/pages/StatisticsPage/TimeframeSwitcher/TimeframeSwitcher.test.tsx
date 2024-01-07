import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Theme } from '@radix-ui/themes';
import TimeframeSwitcher from './TimeframeSwitcher';

describe('<TimeframeSwitcher />', () => {
  // eslint-disable-next-line jest/expect-expect
  it('should render without errors', () => {
    render(
      <Theme>
        <TimeframeSwitcher timeframe={7} setTimeframe={jest.fn()} />
      </Theme>,
    );
  });

  it('should let user adjust timeframe', async () => {
    /**
     * Note: this component is controlled by state set in its parent
     * so in isolation I can't verify what happens when I make new
     * selection because the rerender starts from that parent
     */

    const user = userEvent.setup();

    render(
      <Theme>
        <TimeframeSwitcher timeframe={7} setTimeframe={jest.fn()} />
      </Theme>,
    );

    // Find select component and open it
    await user.click(screen.getByRole('combobox'));

    // Expect to see the option for 30 days
    expect(
      screen.getByRole('option', { name: /last 30 days/i }),
    ).toBeInTheDocument();
  });

  it('should call state setter function', async () => {
    /**
     * Note: this is testing implementation but it's still helpful
     * to verify that it correctly calls state setter in parent
     */

    const user = userEvent.setup();

    // Mock state setter function
    const setTimeframeMock = jest.fn();

    render(
      <Theme>
        <TimeframeSwitcher timeframe={7} setTimeframe={setTimeframeMock} />
      </Theme>,
    );

    // Click select element
    await user.click(screen.getByRole('combobox'));

    // Click last 30 days option
    await user.click(screen.getByRole('option', { name: /last 30 days/i }));

    expect(setTimeframeMock).toHaveBeenCalledWith(30);
  });
});
