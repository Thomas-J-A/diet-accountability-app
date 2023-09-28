import { readFileSync } from 'fs';
import path from 'path';
import express, { Application } from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { applyMiddleware } from 'graphql-middleware';
import resolvers from './resolvers';
import permissions from './auth/permissions';
import connectDB from './configs/db';
import ErrorCodes from './types/error-codes';
import { Context, createContext } from './auth/context';

// Import GraphQL schema
const typeDefs = readFileSync(path.join(__dirname, 'schema.graphql'), 'utf-8');

const app: Application = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
// Function body contains a catch block for errors
void connectDB();

// Create and start up Apollo server instance
const startServer = async () => {
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

  await server.start();

  // Add Apollo Server middleware to app which handles graphql requests
  app.use('/graphql', expressMiddleware(server, { context: createContext }));
};

startServer().catch(() => {
  console.error('Error starting Apollo server instance');
  process.exit(1);
});

// Export so that testing and server startup files can use it
export default app;
