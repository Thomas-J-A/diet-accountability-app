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

export const MEAL_DETAILS = gql`
  fragment MealDetails on Meal {
    id
    description
    location
    rating
    type
  }
`;

export const DAY_EVENT_DETAILS = gql`
  fragment DayEventDetails on DayEvent {
    id
    date
    healthyHabits
    meals {
      ...MealDetails
    }
  }
`;
