import { render, screen } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import MealsRecorded from './MealsRecorded';
import {
  DayEvent,
  LocationEnum,
  MealTypeEnum,
} from '../../../__generated__/graphql';

// Mock an array of day events
const dayEvents: DayEvent[] = [
  {
    id: faker.database.mongodbObjectId(),
    date: new Date(),
    healthyHabits: [],
    meals: [
      {
        id: faker.database.mongodbObjectId(),
        description: faker.lorem.sentence(),
        location: LocationEnum.Home,
        rating: faker.number.int({ min: 1, max: 10 }),
        photoKeys: [],
        type: MealTypeEnum.Breakfast,
      },
    ],
  },
];

describe('<MealsRecorded />', () => {
  // eslint-disable-next-line jest/expect-expect
  it('should render without errors', () => {
    render(<MealsRecorded dayEvents={[]} timeframe={7} />);
  });

  it('should work when timeframe is 7 days', () => {
    render(<MealsRecorded dayEvents={dayEvents} timeframe={7} />);
    expect(screen.getByText('1/21')).toBeInTheDocument();
  });

  it('should work when timeframe is 30 days', () => {
    render(<MealsRecorded dayEvents={dayEvents} timeframe={30} />);
    expect(screen.getByText('1/90')).toBeInTheDocument();
  });

  it('should work when no meals are recorded', () => {
    render(<MealsRecorded dayEvents={[]} timeframe={7} />);
    expect(screen.getByText('0/21')).toBeInTheDocument();
  });
});
