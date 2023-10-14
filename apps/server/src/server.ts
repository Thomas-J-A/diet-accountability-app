import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { expressMiddleware } from '@apollo/server/express4';
import connectDB from './configs/db';
import env from './configs/env';
import { createContext } from './auth/context';
import createApolloServer from './utils/create-apollo-server';

const PORT = env.PORT;

const app: Application = express();

app.use(cors());
app.use(express.json());

// CSP settings too restrictive for dev and testing
// (blocking Apollo Server Playground, etc)
if (env.NODE_ENV === 'production') {
  app.use(helmet());
}

// Connect to MongoDB
// Function body contains a catch block for errors
void connectDB();

// Create and start up Apollo server instance
const startServer = async () => {
  const server = createApolloServer();

  await server.start();

  // Add Apollo Server middleware to app which handles graphql requests
  app.use('/graphql', expressMiddleware(server, { context: createContext }));
};

startServer().catch(() => {
  console.error('Error starting Apollo server instance');
  process.exit(1);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
