import { gql } from '@apollo/client';

export const PAYLOAD_STANDARD = gql`
  fragment PayloadStandard on Payload {
    code
    success
    message
  }
`;

export const USER_DETAILS = gql`
  fragment UserDetails on User {
    id
    firstName
    lastName
    email
  }
`;
