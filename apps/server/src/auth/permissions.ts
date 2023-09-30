import { shield, allow } from 'graphql-shield';
import { isAuthenticated } from './rules';

// TODO: check if I should deny all Query and Mutation fields by default
const permissions = shield(
  {
    Query: {
      protected: isAuthenticated,
      dayEvents: isAuthenticated,
    },
    Mutation: {},
  },
  { fallbackRule: allow, allowExternalErrors: true },
);

export default permissions;
