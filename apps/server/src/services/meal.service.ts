import { GraphQLError } from 'graphql';
import { HydratedDocument } from 'mongoose';
import {
  CreateMealInput,
  CreateMealPayload,
  UpdateMealInput,
  UpdateMealPayload,
} from '../__generated__/resolvers-types';
import Meal, { IMeal } from '../models/meal.model';
import DayEvent, { IDayEvent } from '../models/day-event.model';
import ErrorCodes from '../types/error-codes';
import isEmptyObject from '../utils/is-empty-object';
import isValidObjectId from '../utils/is-valid-object-id';

// Reusable function for ensuring /rating/ value is within range
const validateRating = (rating: number) => {
  if (!(rating >= 1 && rating <= 10)) {
    throw new GraphQLError('Rating must be between 1 and 10 inclusive', {
      extensions: {
        code: ErrorCodes.BAD_USER_INPUT,
      },
    });
  }
};

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

// Represents possible updates to meal document
interface UpdatedFields {
  description?: string;
  location?: string;
  rating?: number;
}

const updateMeal = async (input: UpdateMealInput) => {
  const { id, description, location, rating } = input;

  // Ensure id is a valid ObjectId
  if (!isValidObjectId(id)) {
    throw new GraphQLError(
      'You must provide a valid ObjectId for the id field',
      {
        extensions: {
          code: ErrorCodes.BAD_USER_INPUT,
        },
      },
    );
  }

  // Locate only the updated fields
  const updatedFields: UpdatedFields = {};

  if (description) updatedFields.description = description;
  if (location) updatedFields.location = location;
  if (rating) updatedFields.rating = rating;

  // Verify that at least one value has been changed
  if (isEmptyObject(updatedFields)) {
    throw new GraphQLError('You must specify at least one updated value', {
      extensions: {
        code: ErrorCodes.BAD_USER_INPUT,
      },
    });
  }

  // Ensure rating is within range, if supplied
  if (updatedFields.rating) validateRating(updatedFields.rating);

  // Update record in database
  const updatedMeal = await Meal.findByIdAndUpdate(id, updatedFields, {
    new: true,
  }).exec();

  // Ensure a meal document was even found
  if (!updatedMeal) {
    throw new GraphQLError(`A meal with id of ${id} was not found`, {
      extensions: {
        code: ErrorCodes.BAD_USER_INPUT,
      },
    });
  }

  // Format and return response
  const response: UpdateMealPayload = {
    code: '200',
    success: true,
    message: 'Meal was successfully updated',
    meal: updatedMeal,
  };

  return response;
};

export default { createMeal, updateMeal };
