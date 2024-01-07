import { render } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import AverageRatingsByLocationChart from './AverageRatingsByLocationChart';
import { LocationEnum } from '../../../../__generated__/graphql';

describe('<AverageRatingsByLocationChart />', () => {
  // eslint-disable-next-line jest/expect-expect
  it('should render without errors', () => {
    const data = [
      {
        mealLocation: LocationEnum.Home,
        averageRating: faker.number.int({ min: 1, max: 10 }),
      },
    ];

    render(<AverageRatingsByLocationChart data={data} />);
  });

  // eslint-disable-next-line jest/expect-expect
  it('should work when there is no recorded data', () => {
    render(<AverageRatingsByLocationChart data={[]} />);
  });
});
