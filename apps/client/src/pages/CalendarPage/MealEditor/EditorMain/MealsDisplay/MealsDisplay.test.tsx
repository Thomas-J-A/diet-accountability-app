import { render, screen } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import MealsDisplay from './MealsDisplay';
import {
  LocationEnum,
  MealTypeEnum,
} from '../../../../../__generated__/graphql';

describe('<MealsDisplay />', () => {
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

  // eslint-disable-next-line jest/expect-expect
  it('should render without errors', () => {
    render(
      <MealsDisplay
        currentDayEvent={dayEventMock}
        setFormMode={jest.fn()}
        activeTab={MealTypeEnum.Breakfast}
        setActiveTab={jest.fn()}
      />,
    );
  });

  // eslint-disable-next-line jest/expect-expect
  it('should render if there is no data recorded for current day', () => {
    render(
      <MealsDisplay
        currentDayEvent={undefined}
        setFormMode={jest.fn()}
        activeTab={MealTypeEnum.Breakfast}
        setActiveTab={jest.fn()}
      />,
    );
  });

  it('should display three tabs representing each meal', () => {
    render(
      <MealsDisplay
        currentDayEvent={dayEventMock}
        setFormMode={jest.fn()}
        activeTab={MealTypeEnum.Breakfast}
        setActiveTab={jest.fn()}
      />,
    );

    expect(screen.getByRole('tab', { name: /breakfast/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /lunch/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /dinner/i })).toBeInTheDocument();
  });

  it('should display info about a particular meal if there is data', () => {
    render(
      <MealsDisplay
        currentDayEvent={dayEventMock}
        setFormMode={jest.fn()}
        activeTab={MealTypeEnum.Breakfast}
        setActiveTab={jest.fn()}
      />,
    );

    expect(
      screen.getByText(new RegExp(dayEventMock.meals[0].location)),
    ).toBeInTheDocument();

    expect(
      screen.getByText(new RegExp(dayEventMock.meals[0].description)),
    ).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
  });

  it('should display an add button if there is no data for a particular meal', () => {
    render(
      <MealsDisplay
        currentDayEvent={undefined}
        setFormMode={jest.fn()}
        activeTab={MealTypeEnum.Breakfast}
        setActiveTab={jest.fn()}
      />,
    );

    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });
});
