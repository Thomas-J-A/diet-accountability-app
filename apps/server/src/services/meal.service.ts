import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import {
  createPresignedPost,
  PresignedPostOptions,
} from '@aws-sdk/s3-presigned-post';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { GraphQLError } from 'graphql';
import { v4 as uuidv4 } from 'uuid';
import {
  CreateMealInput,
  UpdateMealInput,
  PresignedUrlsPostInput,
} from '../__generated__/resolvers-types';
import Meal from '../models/meal.model';
import DayEvent from '../models/day-event.model';
import ErrorCodes from '../types/error-codes';
import isEmptyObject from '../utils/is-empty-object';
import isValidObjectId from '../utils/is-valid-object-id';
import createS3Client from '../utils/create-s3-client';
import env from '../configs/env';

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
  if (description.length > 60) {
    throw new GraphQLError('Description must not exceed 60 characters', {
      extensions: { code: ErrorCodes.BAD_USER_INPUT },
    });
  }
};

// Validates that an S3 image belongs to the authed user
const validateImagePermission = (
  key: string,
  authedUserId: string,
): boolean => {
  // Extract userId from the image key
  // Assumes the key format is 'uploads/<userId>/example.png'
  const [, userId] = key.split('/');

  // Check if the requesting user ID matches the userId in the image key
  return authedUserId === userId;
};

const createMeal = async (mealData: CreateMealInput, userId: string) => {
  const { date, description, location, rating, type, photoKeys } = mealData;

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
    photoKeys,
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

// Presigned URLs for storing and retrieving objects from S3
// TODO: Extract to separate service. Kept here because data is ultimately attached to Meal record
// TODO: Add tests for the following resolvers. Create new IAM users/roles/buckets for the testing environment.

// Initialize S3 client
// If in test environment, no need to make S3 client since following resolvers not currently being tested
let s3Client: S3Client;
if (env.NODE_ENV !== 'test') {
  s3Client = createS3Client();
}

// Helper constants
const TEN_MINUTES_S = 600;
const MAX_CONTENT_LENGTH = 10485760; // 10MB
const BUCKET_NAME = env.AWS_BUCKET_NAME;

const createPresignedUrlsPost = async (
  fileData: PresignedUrlsPostInput[],
  userId: string,
) => {
  // Create a promise for each image/file
  const promises = fileData.map(async (file) => {
    const params: PresignedPostOptions = {
      Bucket: BUCKET_NAME,
      Key: `users/${userId}/${uuidv4()}-${file.filename}`,
      Conditions: [
        ['content-length-range', 0, MAX_CONTENT_LENGTH],
        ['starts-with', '$key', `users/${userId}/`],
      ],
      Fields: {
        'Content-Type': `${file.contentType}`,
      },
      Expires: TEN_MINUTES_S,
    };

    const presignedPost = await createPresignedPost(s3Client, params);

    return {
      key: params.Key,
      url: presignedPost.url,
      fields: presignedPost.fields,
    };
  });

  // Await all promises
  const presignedPosts = await Promise.all(promises);

  return presignedPosts;
};

const createPresignedUrlsGet = async (keys: string[], userId: string) => {
  // Create a promise for each key
  const promises = keys.map(async (key) => {
    // Ensure user is requesting only their own uploads
    const hasPermission = validateImagePermission(key, userId);

    if (!hasPermission) {
      throw new GraphQLError('You may only download your own images', {
        extensions: { code: ErrorCodes.FORBIDDEN },
      });
    }

    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    const presignedGet = await getSignedUrl(s3Client, command, {
      expiresIn: TEN_MINUTES_S,
    });

    // Return key as well as URL for convenience/client-side association
    return { key, url: presignedGet };
  });

  // Await all promises
  const presignedGets = await Promise.all(promises);
  return presignedGets;
};

export default {
  createMeal,
  updateMeal,
  createPresignedUrlsPost,
  createPresignedUrlsGet,
};
