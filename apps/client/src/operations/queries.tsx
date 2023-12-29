import { graphql } from '../__generated__/gql';

export const DAY_EVENTS_QUERY = graphql(/* GraphQL */ `
  query DayEvents($dateRange: DayEventsInput!) {
    dayEvents(dateRange: $dateRange) {
      ...DayEventDetails
    }
  }
`);

export const PRESIGNED_URLS_POST_QUERY = graphql(/* GraphQL */ `
  query PresignedUrlsPost($fileData: [PresignedUrlsPostInput!]!) {
    presignedUrlsPost(fileData: $fileData) {
      key
      url
      fields
    }
  }
`);

export const PRESIGNED_URLS_GET_QUERY = graphql(/* GraphQL */ `
  query PresignedUrlsGet($keys: [String!]!) {
    presignedUrlsGet(keys: $keys) {
      key
      url
    }
  }
`);
