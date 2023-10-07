import { GraphQLError } from 'graphql';
import { rule } from 'graphql-shield';
import ErrorCodes from '../types/error-codes';

export const isAuthenticated = rule({ cache: 'contextual' })((
  _parent,
  _args,
  { currentUser },
) => {
  // Return true if user is authenticated
  if (currentUser !== null) return true;

  // Return custom error if not
  return new GraphQLError('You must be authenticated to access this data', {
    extensions: { code: ErrorCodes.UNAUTHENTICATED },
  });
});
