import { shield, allow } from 'graphql-shield';
import { isAuthenticated } from './rules';

const permissions = shield(
  {
    Query: {
      protected: isAuthenticated,
    },
    Mutation: {},
  },
  { fallbackRule: allow, allowExternalErrors: true },
);

export default permissions;
