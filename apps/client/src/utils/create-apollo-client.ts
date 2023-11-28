import { buildClientSchema, IntrospectionQuery } from 'graphql';
import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
  from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { withScalars } from 'apollo-link-scalars';
import { GraphQLDate } from 'graphql-scalars';
import introspectionResult from '../__generated__/introspection.json';
import { toastError, toastInfo } from '../components/UI/Toast/toast';
import ToastMessages from '../constants/toast-messages';

const createApolloClient = (logOut: () => void) => {
  // Serialize JS Date types into graphql-scalars' Date scalars, and parse Date scalars into JS Date types
  const schema = buildClientSchema(
    introspectionResult as unknown as IntrospectionQuery,
  );

  const typesMap = {
    Date: GraphQLDate,
  };

  const dateScalarsLink = withScalars({ schema, typesMap });

  // Add jwt token to every request
  const authLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem('accessToken');
    operation.setContext(({ headers = {} }) => ({
      headers: token
        ? { ...headers, authorization: `Bearer ${token}` }
        : headers,
    }));

    return forward(operation);
  });

  // Handle GraphQLErrors and networkErrors from Apollo Server
  const errorLink = onError(({ networkError, graphQLErrors }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (err.extensions.code === 'TOKEN_EXPIRED') {
          // Access token has expired, get user to re-authenticate
          logOut();
          void client.resetStore();
          toastInfo('Token has expired. Please sign in again. 🔄');
        }

        if (err.extensions.code === 'TOKEN_INVALID') {
          // Access token not verified
          logOut();
          void client.resetStore();
          toastError('Token is invalid 🔐');
        }
      }
    }

    if (networkError) {
      toastError(ToastMessages.NETWORK_ERROR);
    }
  });

  // Endpoint for Apollo server (proxied by Vite in development)
  const httpLink = new HttpLink({
    uri: '/graphql',
  });

  // Initialize Apollo client
  const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link: from([dateScalarsLink, authLink, errorLink, httpLink]),
  });

  return client;
};

export default createApolloClient;
