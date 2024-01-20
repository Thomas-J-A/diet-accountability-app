import path from 'path';
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

// Serve static client files in production
// Also, only allow helmet middleware in prod
// CSP settings too restrictive for dev and testing (blocking Apollo Server Playground, etc)
if (env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
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

// HTTP health check endpoint so hosting platform can check health of app
app.get('/health', (_, res) => {
  res.send('ok');
});

// Catch-all route for non static/non GraphQL routes, intended to be
// handled by react-router on client (client/page, /users/12, /foo, etc)
// index.html will be returned and react-router will do client-side routing to page
if (env.NODE_ENV === 'production') {
  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
