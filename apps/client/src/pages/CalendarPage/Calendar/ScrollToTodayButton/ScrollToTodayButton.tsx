import { forwardRef } from 'react';
import { Button } from '@radix-ui/themes';
import { CalendarIcon } from '@radix-ui/react-icons';

const ScrollToTodayButton = forwardRef<HTMLDivElement>((_, ref) => {
  const scrollToToday = () => {
    // Ref can be a callback or object
    // Narrow type to an object with 'current' property
    if (typeof ref === 'function') {
      throw new Error(
        'This component does not accept ref callbacks. Please provide a ref object.',
      );
    }

    if (ref?.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <Button
      style={{
        position: 'absolute',
        right: 'var(--space-2)',
        bottom: 'var(--space-2)',
        cursor: 'pointer',
        boxShadow: 'var(--shadow-3)',
      }}
      onClick={scrollToToday}
    >
      <CalendarIcon /> Today
    </Button>
  );
});

ScrollToTodayButton.displayName = 'ScrollToTodayButton';

export default ScrollToTodayButton;
