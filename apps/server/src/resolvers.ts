import { Resolvers } from './__generated__/resolvers-types';
import userService from './services/user.service';

const resolvers: Resolvers = {
  Query: {
    hello: () => 'foo',
    protected: () => 'For authed eyes only',
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
