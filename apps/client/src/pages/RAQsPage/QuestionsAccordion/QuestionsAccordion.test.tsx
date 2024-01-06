import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuestionsAccordion from './QuestionsAccordion';

// Note: Nested AccordionItem component tested here in the parent because the Radix
// Primitive used is split over both components and they need to be rendered at once

describe('<QuestionsAccordion />', () => {
  // Regex representing first line of first answer
  const questionOneAnswer = /people who are wondering/i;

  // eslint-disable-next-line jest/expect-expect
  it('should render without errors', () => {
    render(<QuestionsAccordion />);
  });

  it('should hide answers by default', () => {
    render(<QuestionsAccordion />);

    expect(screen.queryByText(questionOneAnswer)).not.toBeInTheDocument();
  });

  it('should reveal answer when question is clicked', async () => {
    // Set up a user 'session'
    const user = userEvent.setup();

    render(<QuestionsAccordion />);

    // Query for open button, and activate it
    const button = screen.getByRole('button', { name: /who is it for?/i });
    await user.click(button);

    // Expect answer to be in UI
    expect(screen.getByText(questionOneAnswer)).toBeInTheDocument();
  });

  it('should hide answer when question is clicked again', async () => {
    const user = userEvent.setup();

    render(<QuestionsAccordion />);

    // Click button first time
    const button = screen.getByRole('button', { name: /who is it for?/i });
    await user.click(button);

    expect(screen.getByText(questionOneAnswer)).toBeInTheDocument();

    // Click button a second time
    await user.click(button);

    expect(screen.queryByText(questionOneAnswer)).not.toBeInTheDocument();
  });
});
