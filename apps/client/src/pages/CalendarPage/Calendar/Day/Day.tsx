import { Text } from '@radix-ui/themes';
import { isAfter, isToday } from 'date-fns';
import { DayEvent } from '../../../../__generated__/graphql';
import * as S from './Day.styled';

// Compute average rating across 1-3 meals for current day
const calculateAverageRating = (
  dayEvent: DayEvent | undefined,
): number | null => {
  if (!dayEvent) {
    return null;
  }

  const ratingsSum = dayEvent.meals
    .map((meal) => meal.rating)
    .reduce((acc, currentValue) => acc + currentValue);

  const averageRating = ratingsSum / dayEvent.meals.length;

  return averageRating;
};

interface DayProps {
  day: number;
  date: Date;
  dayEvent?: DayEvent;
}

const Day = ({ day, date, dayEvent }: DayProps) => {
  // Style Day differently depending on following props
  const dynamicProps: {
    $gridColumn?: number;
    $isToday?: boolean;
    $isFuture?: boolean;
    $averageRating?: number;
  } = {};

  if (day === 1) {
    // First day of month is explicitly placed in grid
    let weekdayAsNumber = date.getDay();

    // Date.getDay method returns 0 for Sunday, must be 7 to fit grid
    // Not 0-6, but 1-7
    if (weekdayAsNumber === 0) weekdayAsNumber = 7;

    dynamicProps.$gridColumn = weekdayAsNumber;
  }

  // Today's date needs to be clearly visible
  if (isToday(date)) {
    dynamicProps.$isToday = true;
  }

  // Future dates are non-interactive so styling must reflect that
  if (isAfter(date, new Date())) {
    dynamicProps.$isFuture = true;
  }

  // Each day has a gradient corresponding to the average rating so
  // user can see at a glance how healthily they've been eating
  const averageRating = calculateAverageRating(dayEvent);

  if (averageRating) {
    dynamicProps.$averageRating = averageRating;
  }

  return (
    <S.Day
      height="7"
      p="1"
      {...dynamicProps}
      onClick={() => {
        dynamicProps.$isFuture ? null : console.log('Clicked date: ', date);
      }}
    >
      <Text size="1" style={{ color: 'var(--gray-6)' }}>
        {day}
      </Text>
    </S.Day>
  );
};

export default Day;
