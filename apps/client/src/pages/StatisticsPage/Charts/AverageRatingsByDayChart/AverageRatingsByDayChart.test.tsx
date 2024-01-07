import { render } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import AverageRatingsByDayChart from './AverageRatingsByDayChart';

describe('<AverageRatingsByDayChart />', () => {
  // eslint-disable-next-line jest/expect-expect
  it('should render without errors', () => {
    const data = [
      {
        date: '2024-01-01',
        averageRating: faker.number.int({ min: 1, max: 10 }),
      },
    ];

    render(<AverageRatingsByDayChart data={data} />);
  });

  // eslint-disable-next-line jest/expect-expect
  it('should work when there is no recorded data', () => {
    render(<AverageRatingsByDayChart data={[]} />);
  });
});
