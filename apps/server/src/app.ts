import { readFileSync } from 'fs';
import path from 'path';
import express, { Application } from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import gql from 'graphql-tag';
import resolvers from './resolvers';

// Import schema and parse into a DocumentNode type
const typeDefs = gql(
  readFileSync(path.join(__dirname, 'schema.graphql'), 'utf-8'),
);

const app: Application = express();

// Create and start up Apollo server instance
const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  // Add Apollo Server middleware to app which handles graphql requests
  app.use('/graphql', cors(), express.json(), expressMiddleware(server));
};

startServer().catch(() => {
  console.log('Error starting Apollo server instance');
  process.exit(1);
});

// Export so that testing and server startup files can use it
export default app;
