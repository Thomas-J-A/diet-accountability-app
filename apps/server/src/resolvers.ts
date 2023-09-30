import { GraphQLError } from 'graphql';
import { Resolvers } from './__generated__/resolvers-types';
import ErrorCodes from './types/error-codes';
import dayEventService from './services/day-event.service';
import userService from './services/user.service';

const resolvers: Resolvers = {
  Query: {
    hello: () => 'foo',
    protected: () => 'For authed eyes only',
    dayEvents: async (_, { input }, { currentUser }) => {
      // graphql-shield isAuthenticated rule should filter out null type
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
  },
};

export default resolvers;
