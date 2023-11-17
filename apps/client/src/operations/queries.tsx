import { graphql } from '../__generated__/gql';

export const DAY_EVENTS_QUERY = graphql(/* GraphQL */ `
  query DayEvents($dateRange: DayEventsInput!) {
    dayEvents(dateRange: $dateRange) {
      ...DayEventDetails
    }
  }
`);
