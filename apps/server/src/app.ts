import { readFileSync } from 'fs';
import path from 'path';
import express, { Application } from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { Model } from 'mongoose';
import resolvers from './resolvers';
import connectDB from './configs/db';
import User, { IUser } from './models/user.model';
import ErrorCodes from './types/error-codes';

// Import GraphQL schema
const typeDefs = readFileSync(path.join(__dirname, 'schema.graphql'), 'utf-8');

const app: Application = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
// Function definition contains a catch block for errors
void connectDB();

// Interface for resolver contextValue arg
export interface Context {
  models: {
    User: Model<IUser>;
  };
}

// Create and start up Apollo server instance
const startServer = async () => {
  const server = new ApolloServer<Context>({
    typeDefs,
    resolvers,
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
  app.use(
    '/graphql',
    // Context function must return a Promise
    // eslint-disable-next-line @typescript-eslint/require-await
    expressMiddleware(server, { context: async () => ({ models: { User } }) }),
  );
};

startServer().catch(() => {
  console.error('Error starting Apollo server instance');
  process.exit(1);
});

// Export so that testing and server startup files can use it
export default app;
