import { gql } from 'graphql-tag';

export const DAY_EVENTS = gql`
  query DayEvents($dateRange: DayEventsInput!) {
    dayEvents(dateRange: $dateRange) {
      id
      date
      healthyHabits
      meals {
        id
        description
        location
        rating
        type
      }
    }
  }
`;
