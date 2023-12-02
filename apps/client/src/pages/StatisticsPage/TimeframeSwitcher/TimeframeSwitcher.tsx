import { Select } from '@radix-ui/themes';

interface TimeframeSwitcherProps {
  timeframe: 7 | 30;
  setTimeframe: React.Dispatch<React.SetStateAction<7 | 30>>;
}

const TimeframeSwitcher = ({
  timeframe,
  setTimeframe,
}: TimeframeSwitcherProps) => {
  // Select component's onValueChange function calls handler with a string value, this helper
  // function converts that value into a number suitable for the setTimeframe state setter
  const handleValueChange = (value: string) => {
    setTimeframe(+value as 7 | 30);
  };

  return (
    <Select.Root value={timeframe.toString()} onValueChange={handleValueChange}>
      <Select.Trigger />
      <Select.Content position="popper">
        <Select.Item value="7">Last 7 Days</Select.Item>
        <Select.Item value="30">Last 30 Days</Select.Item>
      </Select.Content>
    </Select.Root>
  );
};

export default TimeframeSwitcher;
