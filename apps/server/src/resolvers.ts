/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { GraphQLError } from 'graphql';
import { GraphQLDate } from 'graphql-scalars';
import { JwtPayload } from 'jsonwebtoken';
import { Resolvers } from './__generated__/resolvers-types';
import ErrorCodes from './types/error-codes';
import Meal from './models/meal.model';
import dayEventService from './services/day-event.service';
import mealService from './services/meal.service';
import userService from './services/user.service';

// Verifies that JWT token contains a sub claim which server then uses to extract request user ID
const checkSubClaim = (payload: JwtPayload): void => {
  if (!payload.sub) {
    throw new GraphQLError('Token must contain a sub claim', {
      extensions: { code: ErrorCodes.TOKEN_INVALID },
    });
  }
};

const resolvers: Resolvers = {
  Date: GraphQLDate,
  Query: {
    dayEvents: async (_, { dateRange }, { currentUser }) => {
      // Ensure currentUser is not null (handled by graphql-shield)
      const currentUserAsJwtPayload = currentUser!;

      // Ensure there is a sub claim in the JWT payload
      checkSubClaim(currentUserAsJwtPayload);

      // Fetch day events for the specified date range and user ID
      const result = await dayEventService.getDayEvents(
        dateRange,
        currentUserAsJwtPayload.sub!,
      );

      return result;
    },
  },
  Mutation: {
    signUp: async (_, { userData }) => {
      const result = await userService.signUp(userData);
      return result;
    },
    signIn: async (_, { credentials }) => {
      const result = await userService.signIn(credentials);
      return result;
    },
    deleteUser: async (_, { id }, { currentUser }) => {
      const currentUserAsJwtPayload = currentUser!;
      checkSubClaim(currentUserAsJwtPayload);

      const result = await userService.deleteUser(
        id,
        currentUserAsJwtPayload.sub!,
      );
      return result;
    },
    createMeal: async (_, { mealData }, { currentUser }) => {
      const currentUserAsJwtPayload = currentUser!;
      checkSubClaim(currentUserAsJwtPayload);

      const result = await mealService.createMeal(
        mealData,
        currentUserAsJwtPayload.sub!,
      );

      return result;
    },
    updateMeal: async (_, { id, updatedMealData }) => {
      const result = await mealService.updateMeal(id, updatedMealData);
      return result;
    },
    addSticker: async (_, { stickerData }, { currentUser }) => {
      const currentUserAsJwtPayload = currentUser!;
      checkSubClaim(currentUserAsJwtPayload);

      const result = await dayEventService.addSticker(
        stickerData,
        currentUserAsJwtPayload.sub!,
      );

      return result;
    },
    removeSticker: async (_, { stickerData }, { currentUser }) => {
      const currentUserAsJwtPayload = currentUser!;
      checkSubClaim(currentUserAsJwtPayload);

      const result = await dayEventService.removeSticker(
        stickerData,
        currentUserAsJwtPayload.sub!,
      );

      return result;
    },
  },
  DayEvent: {
    meals: async ({ meals: mealIds }) => {
      const meals = await Meal.find({ _id: { $in: mealIds } }).exec();
      return meals;
    },
  },
};

export default resolvers;
