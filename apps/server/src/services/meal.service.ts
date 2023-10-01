import { GraphQLError } from 'graphql';
import { HydratedDocument } from 'mongoose';
import {
  CreateMealInput,
  CreateMealPayload,
} from '../__generated__/resolvers-types';
import Meal, { IMeal } from '../models/meal.model';
import DayEvent, { IDayEvent } from '../models/day-event.model';
import ErrorCodes from '../types/error-codes';

const createMeal = async (input: CreateMealInput, userId: string) => {
  const { date, description, location, rating, type } = input;

  // Ensure rating is within range
  if (!(rating >= 1 && rating <= 10)) {
    throw new GraphQLError('Rating must be between 1 and 10 inclusive', {
      extensions: {
        code: ErrorCodes.BAD_USER_INPUT,
      },
    });
  }

  // Create new meal document
  const newMeal: HydratedDocument<IMeal> = new Meal({
    description,
    location,
    rating,
    type,
  });

  await newMeal.save();

  // Find corresponding DayEvent document
  const dayEvent = await DayEvent.findOne({ date }).exec();

  if (dayEvent) {
    // Update meals for that day
    dayEvent.meals = [...dayEvent.meals, newMeal._id];

    await dayEvent.save();
  } else {
    // No DayEvent document exists, create a new one
    const newDayEvent: HydratedDocument<IDayEvent> = new DayEvent({
      user: userId,
      date,
      meals: [newMeal._id],
    });

    await newDayEvent.save();
  }

  // Format and return response
  const response: CreateMealPayload = {
    code: '201',
    success: true,
    message: 'Meal was successfully added',
    meal: newMeal,
    // dayEvent: dayEvent,
  };

  return response;
};

export default { createMeal };
