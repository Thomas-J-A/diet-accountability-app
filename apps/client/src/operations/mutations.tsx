import { graphql } from '../__generated__/gql';

export const SIGN_UP_MUTATION = graphql(/* GraphQL */ `
  mutation SignUp($userData: SignUpInput!) {
    signUp(userData: $userData) {
      ...PayloadStandard
      user {
        ...UserDetails
      }
      tokens {
        accessToken
      }
    }
  }
`);

export const SIGN_IN_MUTATION = graphql(/* GraphQL */ `
  mutation SignIn($credentials: SignInInput!) {
    signIn(credentials: $credentials) {
      ...PayloadStandard
      user {
        ...UserDetails
      }
      tokens {
        accessToken
      }
    }
  }
`);

// export const DELETE_USER_MUTATION = graphql(/* GraphQL */ `
//   mutation DeleteUser($id: ID!) {
//     deleteUser(id: $id) {
//       ...PayloadStandard
//       user {
//         ...UserDetails
//       }
//     }
//   }
// `);
