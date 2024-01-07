import { render } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import AverageRatingsByMealChart from './AverageRatingsByMealChart';
import { MealTypeEnum } from '../../../../__generated__/graphql';

describe('<AverageRatingsByMealChart />', () => {
  // eslint-disable-next-line jest/expect-expect
  it('should render without errors', () => {
    const data = [
      {
        mealType: MealTypeEnum.Breakfast,
        averageRating: faker.number.int({ min: 1, max: 10 }),
      },
    ];

    render(<AverageRatingsByMealChart data={data} />);
  });

  // eslint-disable-next-line jest/expect-expect
  it('should work when there is no recorded data', () => {
    render(<AverageRatingsByMealChart data={[]} />);
  });
});
