import { Button } from '@radix-ui/themes';
import { CalendarIcon } from '@radix-ui/react-icons';

interface ScrollToTodayButtonProps {
  onClick: () => void;
}

const ScrollToTodayButton = ({ onClick }: ScrollToTodayButtonProps) => {
  return (
    <Button
      style={{
        position: 'absolute',
        right: 'var(--space-2)',
        bottom: 'var(--space-2)',
        cursor: 'pointer',
        boxShadow: 'var(--shadow-3)',
      }}
      onClick={onClick}
    >
      <CalendarIcon /> Today
    </Button>
  );
};

export default ScrollToTodayButton;
