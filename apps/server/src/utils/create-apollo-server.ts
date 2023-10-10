import { readFileSync } from 'fs';
import path from 'path';
import { ApolloServer } from '@apollo/server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { applyMiddleware } from 'graphql-middleware';
import { Context } from '../auth/context';
import permissions from '../../src/auth/permissions';
import ErrorCodes from '../types/error-codes';
import resolvers from '../../src/resolvers';

// Import GraphQL schema
const typeDefs = readFileSync(
  path.join(__dirname, '../schema.graphql'),
  'utf-8',
);

const createApolloServer = () => {
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // Add graphql-shield auth middleware
  const schemaWithPermissions = applyMiddleware(schema, permissions);

  // Create Apollo Server instance
  const server = new ApolloServer<Context>({
    schema: schemaWithPermissions,
    formatError: (formattedErr, err) => {
      console.error(err);

      // If error is from an uncaught/unhandled exception, return a generic message
      if (formattedErr.extensions?.code === ErrorCodes.INTERNAL_SERVER_ERROR) {
        return {
          ...formattedErr,
          message: 'Something went really south on our end',
        };
      }

      // Otherwise, leave as is
      return formattedErr;
    },
  });

  return server;
};

export default createApolloServer;
