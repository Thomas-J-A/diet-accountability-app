import { Flex, Text } from '@radix-ui/themes';
import calculateMealsRecorded from './calculate-meals-recorded';
import { DayEvent } from '../../../__generated__/graphql';

interface MealsRecordedProps {
  dayEvents: DayEvent[];
  timeframe: 7 | 30;
}

const MealsRecorded = ({ dayEvents, timeframe }: MealsRecordedProps) => {
  return (
    <Flex
      justify="between"
      p="3"
      style={{
        border: '1px solid var(--gray-a6)',
        borderRadius: 'var(--radius-2)',
      }}
    >
      <Text>Meals recorded</Text>
      <Text>{calculateMealsRecorded(dayEvents, timeframe)}</Text>
    </Flex>
  );
};

export default MealsRecorded;
