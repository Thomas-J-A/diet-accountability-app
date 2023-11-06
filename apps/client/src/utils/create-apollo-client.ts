import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { toastError } from '../components/UI/Toast/toast';
import ToastMessages from '../constants/toast-messages';

const createApolloClient = () => {
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

  // TODO: Update this Link to implement refresh tokens
  // https://www.apollographql.com/docs/react/data/error-handling/#retrying-operations
  // Handle network errors in a generic way
  // GraphQLErrors are handled inside calling code
  const networkErrorLink = onError(({ networkError }) => {
    if (networkError) {
      toastError(ToastMessages.NETWORK_ERROR);
    }
  });

  // Initialize Apollo client
  const client = new ApolloClient({
    // connectToDevTools: true,
    cache: new InMemoryCache(),
    link: from([authLink, networkErrorLink, httpLink]),
  });

  return client;
};

export default createApolloClient;
