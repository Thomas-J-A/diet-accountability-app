import { GraphQLError } from 'graphql';
import {
  CreateMealInput,
  UpdateMealInput,
} from '../__generated__/resolvers-types';
import Meal from '../models/meal.model';
import DayEvent from '../models/day-event.model';
import ErrorCodes from '../types/error-codes';
import isEmptyObject from '../utils/is-empty-object';
import isValidObjectId from '../utils/is-valid-object-id';

// Reusable function for ensuring 'rating' value is within range
const validateRating = (rating: number) => {
  if (!(rating >= 1 && rating <= 10)) {
    throw new GraphQLError('Rating must be between 1 and 10 inclusive', {
      extensions: { code: ErrorCodes.BAD_USER_INPUT },
    });
  }
};

// Reusable function for ensuring 'description' value does not exceed character limit
const validateDescription = (description: string) => {
  if (description.length > 100) {
    throw new GraphQLError('Description must not exceed 60 characters', {
      extensions: { code: ErrorCodes.BAD_USER_INPUT },
    });
  }
};

const createMeal = async (mealData: CreateMealInput, userId: string) => {
  const { date, description, location, rating, type } = mealData;

  // Ensure rating is within range
  validateRating(rating);

  // Ensure description does not exceed character limit
  validateDescription(description);

  // Create and save new meal
  const newMeal = new Meal({
    description,
    location,
    rating,
    type,
  });

  await newMeal.save();

  // Find corresponding dayEvent document, if it exists
  let dayEvent = await DayEvent.findOne({ user: userId, date }).exec();

  // Flag to help compose the 'message' value in response
  const existsDayEvent = !!dayEvent;

  if (dayEvent) {
    // Update meals for that dayEvent
    dayEvent.meals = [...dayEvent.meals, newMeal._id];
    await dayEvent.save();
  } else {
    // Create and save new dayEvent
    dayEvent = new DayEvent({
      user: userId,
      date,
      meals: [newMeal._id],
    });

    await dayEvent.save();
  }

  // Format response to match schema
  const response = {
    code: 201,
    success: true,
    message: `Meal was successfully added and DayEvent was ${
      existsDayEvent ? 'updated' : 'created'
    }`,
    meal: newMeal,
    dayEvent,
  };

  return response;
};

// Represents possible updates to meal document
interface UpdatedFields {
  description?: string;
  location?: string;
  rating?: number;
}

const updateMeal = async (id: string, updatedMealData: UpdateMealInput) => {
  const { description, location, rating } = updatedMealData;

  // Ensure id is a valid ObjectId
  if (!isValidObjectId(id)) {
    throw new GraphQLError(`'${id}' is not a valid ObjectId`, {
      extensions: { code: ErrorCodes.BAD_USER_INPUT },
    });
  }

  // Find the updated fields
  const updatedFields: UpdatedFields = {};

  if (description) updatedFields.description = description;
  if (location) updatedFields.location = location;
  if (rating) updatedFields.rating = rating;

  // Verify that at least one value has been changed
  if (isEmptyObject(updatedFields)) {
    throw new GraphQLError('No updated values were provided', {
      extensions: { code: ErrorCodes.BAD_USER_INPUT },
    });
  }

  // Ensure rating is within range, if supplied
  if (updatedFields.rating) validateRating(updatedFields.rating);

  // Ensure description is within the character limit, if supplied
  if (updatedFields.description) validateDescription(updatedFields.description);

  // Update document in database
  const updatedMeal = await Meal.findByIdAndUpdate(id, updatedFields, {
    new: true,
  }).exec();

  // Ensure a meal document was found and updated
  if (!updatedMeal) {
    throw new GraphQLError(`A meal with id of ${id} was not found`, {
      extensions: { code: ErrorCodes.RESOURCE_NOT_FOUND },
    });
  }

  // Format and return response
  const response = {
    code: 200,
    success: true,
    message: 'Meal was successfully updated',
    meal: updatedMeal,
  };

  return response;
};

export default { createMeal, updateMeal };
