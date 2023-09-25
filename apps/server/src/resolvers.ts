import { Resolvers } from './__generated__/resolvers-types';
import userService from './services/user.service';

const resolvers: Resolvers = {
  Query: {
    hello: () => 'foo',
  },
  Mutation: {
    register: async (_, { input }) => {
      const newUser = await userService.register(input);
      return newUser;
    },
  },
};

export default resolvers;
