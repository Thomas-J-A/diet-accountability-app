/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { GraphQLError } from 'graphql';
import { JwtPayload } from 'jsonwebtoken';
import { Resolvers } from './__generated__/resolvers-types';
import ErrorCodes from './types/error-codes';
import dayEventService from './services/day-event.service';
import mealService from './services/meal.service';
import userService from './services/user.service';

// Verifies that JWT token contains a sub claim which server then uses to extract request user ID
const checkSubClaim = (payload: JwtPayload): void => {
  if (!payload.sub) {
    throw new GraphQLError('Token must contain a sub claim', {
      extensions: {
        code: ErrorCodes.TOKEN_INVALID,
      },
    });
  }
};

const resolvers: Resolvers = {
  Query: {
    dayEvents: async (_, { input }, { currentUser }) => {
      // graphql-shield isAuthenticated rule should filter out null type
      const currentUserAsJwtPayload = currentUser!;

      // Ensure there is a sub claim
      if (!currentUserAsJwtPayload.sub) {
        throw new GraphQLError('Token must contain a sub claim', {
          extensions: {
            code: ErrorCodes.TOKEN_INVALID,
          },
        });
      }

      const result = await dayEventService.getDayEvents(
        input,
        currentUserAsJwtPayload.sub,
      );

      return result;
    },
  },
  Mutation: {
    signUp: async (_, { input }) => {
      const result = await userService.signUp(input);
      return result;
    },
    signIn: async (_, { input }) => {
      const result = await userService.signIn(input);
      return result;
    },
    createMeal: async (_, { input }, { currentUser }) => {
      // graphql-shield isAuthenticated rule should filter out null type
      const currentUserAsJwtPayload = currentUser!;

      // Ensure there is a sub claim
      checkSubClaim(currentUserAsJwtPayload);

      const result = await mealService.createMeal(
        input,
        currentUserAsJwtPayload.sub!,
      );
      return result;
    },
    updateMeal: async (_, { input }) => {
      const result = await mealService.updateMeal(input);
      return result;
    },
  },
};

export default resolvers;
