import { render, screen } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import { useState as useStateMock } from 'react';
import EditorMain from './EditorMain';
import { LocationEnum, MealTypeEnum } from '../../../../__generated__/graphql';

// Mock child components
jest.mock('./AddEditMealForm/AddEditMealForm', () =>
  jest.fn().mockReturnValue(<div>Add Edit Meal Form</div>),
);

jest.mock('./MealsDisplay/MealsDisplay', () =>
  jest.fn().mockReturnValue(<div>Meals Display</div>),
);

// Mock useState hook to control form mode
// Note: there are two calls to useState so it requires two mock return values
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

// Mock day event
// TODO: Extract this mock data into a reusable module
const dayEventMock = {
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
};

describe('<EditorMain />', () => {
  beforeEach(() => {
    (useStateMock as jest.Mock)
      .mockReturnValueOnce([null, jest.fn()])
      .mockReturnValueOnce([MealTypeEnum.Breakfast, jest.fn()]);
  });

  // eslint-disable-next-line jest/expect-expect
  it('should render without errors', () => {
    render(<EditorMain currentDayEvent={dayEventMock} />);
  });

  // eslint-disable-next-line jest/expect-expect
  it('should render if there is no data recorded for current day', () => {
    render(<EditorMain currentDayEvent={undefined} />);
  });

  it('should render a meal display by default', () => {
    render(<EditorMain currentDayEvent={dayEventMock} />);
    expect(screen.getByText(/meals display/i)).toBeInTheDocument();
    expect(screen.queryByText(/add edit meal form/i)).not.toBeInTheDocument();
  });

  it("should render a form if form mode is changed to 'add' or 'edit'", () => {
    // Ovveride mocking done in beforeEach to return different value for formMode state
    (useStateMock as jest.Mock)
      .mockReset()
      .mockReturnValueOnce(['ADD', jest.fn()])
      .mockReturnValueOnce([faker.word.noun(), jest.fn()]);

    render(<EditorMain currentDayEvent={dayEventMock} />);

    expect(screen.getByText(/add edit meal form/i)).toBeInTheDocument();
    expect(screen.queryByText(/meals display/i)).not.toBeInTheDocument();
  });
});
