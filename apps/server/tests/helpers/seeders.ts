import { Types } from 'mongoose';
import { faker } from '@faker-js/faker';
import User from '../../src/models/user.model';
import DayEvent from '../../src/models/day-event.model';
import Meal from '../../src/models/meal.model';
import {
  HealthyHabitEnum,
  LocationEnum,
  MealTypeEnum,
} from '../../src/__generated__/resolvers-types';

interface ISeedUser {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

export const seedUser = async (data: ISeedUser = {}) => {
  const user = new User({
    firstName: data.firstName ?? faker.person.firstName(),
    lastName: data.lastName ?? faker.person.lastName(),
    email: data.email ?? faker.internet.email(),
    password: data.password ?? faker.internet.password({ length: 10 }),
  });

  await user.save();

  return user;
};

interface ISeedDayEvent {
  user?: Types.ObjectId;
  date?: Date;
  healthyHabits?: HealthyHabitEnum[];
  meals?: Types.ObjectId[];
}

export const seedDayEvent = async (data: ISeedDayEvent = {}) => {
  const dayEvent = new DayEvent({
    user: data.user ?? new Types.ObjectId(),
    date: data.date ?? new Date('2000-01-01T00:00:00Z'),
    healthyHabits: data.healthyHabits ?? [],
    meals: data.meals ?? [],
  });

  await dayEvent.save();

  return dayEvent;
};

interface ISeedMeal {
  description?: string;
  location?: LocationEnum;
  rating?: number;
  type?: MealTypeEnum;
}

export const seedMeal = async (data: ISeedMeal = {}) => {
  const meal = new Meal({
    description: data.description ?? faker.lorem.words(10),
    location: data.location ?? LocationEnum.Home,
    rating: data.rating ?? 5,
    type: data.type ?? MealTypeEnum.Breakfast,
  });

  await meal.save();

  return meal;
};
