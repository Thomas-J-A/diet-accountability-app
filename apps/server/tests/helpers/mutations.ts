import { gql } from 'graphql-tag';

export const SIGN_UP = gql`
  mutation SignUp($userData: SignUpInput!) {
    signUp(userData: $userData) {
      code
      message
      user {
        id
        firstName
        lastName
        email
      }
      tokens {
        accessToken
      }
    }
  }
`;

export const SIGN_IN = gql`
  mutation SignIn($credentials: SignInInput!) {
    signIn(credentials: $credentials) {
      code
      message
      user {
        id
        firstName
        lastName
        email
      }
      tokens {
        accessToken
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      code
      message
      user {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

export const CREATE_MEAL = gql`
  mutation CreateMeal($mealData: CreateMealInput!) {
    createMeal(mealData: $mealData) {
      code
      message
      meal {
        id
        description
        location
        rating
        type
      }
      dayEvent {
        id
        date
        healthyHabits
        meals {
          id
        }
      }
    }
  }
`;

export const UPDATE_MEAL = gql`
  mutation UpdateMeal($id: ID!, $updatedMealData: UpdateMealInput!) {
    updateMeal(id: $id, updatedMealData: $updatedMealData) {
      code
      message
      meal {
        id
        description
        location
        rating
        type
      }
    }
  }
`;

export const ADD_STICKER = gql`
  mutation AddSticker($stickerData: AddStickerInput!) {
    addSticker(stickerData: $stickerData) {
      code
      message
      dayEvent {
        id
        date
        healthyHabits
        meals {
          id
        }
      }
    }
  }
`;

export const REMOVE_STICKER = gql`
  mutation RemoveSticker($stickerData: RemoveStickerInput!) {
    removeSticker(stickerData: $stickerData) {
      code
      message
      dayEvent {
        id
        date
        healthyHabits
        meals {
          id
        }
      }
    }
  }
`;
