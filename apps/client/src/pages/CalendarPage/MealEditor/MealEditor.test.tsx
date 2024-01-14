import { render, screen } from '@testing-library/react';
import MealEditor from './MealEditor';
import { faker } from '@faker-js/faker';
import {
  DayEvent,
  LocationEnum,
  MealTypeEnum,
} from '../../../__generated__/graphql';

// Mock child components for shallow rendering
jest.mock('./EditorHeader/EditorHeader', () =>
  jest.fn().mockReturnValue(<div>Editor Header</div>),
);

jest.mock('./EditorMain/EditorMain', () =>
  jest.fn().mockReturnValue(<div>Editor Main</div>),
);

// Mock DateInEditor context
jest.mock('../../../contexts/DateInEditorContext', () => ({
  useDateInEditor: jest.fn().mockReturnValue({
    dateInEditor: new Date(),
    setDateInEditor: jest.fn(),
  }),
}));

describe('<MealEditor />', () => {
  // Mock an array of day events
  const dayEventsMock: DayEvent[] = [
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

  // eslint-disable-next-line jest/expect-expect
  it('should render without errors', () => {
    render(<MealEditor dayEvents={dayEventsMock} />);
  });

  it('should render all child components', () => {
    render(<MealEditor dayEvents={dayEventsMock} />);

    expect(screen.getByText('Editor Header')).toBeInTheDocument();
    expect(screen.getByText('Editor Main')).toBeInTheDocument();
  });

  // eslint-disable-next-line jest/expect-expect
  it('should work with an empty dayEvents list', () => {
    render(<MealEditor dayEvents={[]} />);
  });

  it('should display a coming soon message for HealthyHabits feature', () => {
    render(<MealEditor dayEvents={dayEventsMock} />);
    expect(screen.getByText(/coming soon/i)).toBeInTheDocument();
  });
});
