import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { toastError, toastInfo } from '../components/UI/Toast/toast';
import ToastMessages from '../constants/toast-messages';

const createApolloClient = (logOut: () => void) => {
  // Endpoint for Apollo server (proxied by Vite)
  const httpLink = new HttpLink({
    uri: '/graphql',
  });

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

  // Initialize Apollo client
  const client = new ApolloClient({
    // connectToDevTools: true,
    cache: new InMemoryCache(),
    link: from([authLink, errorLink, httpLink]),
  });

  return client;
};

export default createApolloClient;
