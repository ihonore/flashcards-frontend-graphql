import { gql } from '@apollo/client';

export const QUERY_ALL_FLASHCARDS = gql`
  query Flashcards {
    flashcards {
      flashcards {
        id
        question
        answer
        isDone
        postedBy {
          email
        }
        createdAt
      }
    }
  }
`;

export const SORT_BY_TIME_QUERY = gql`
  query OrderBy($orderBy: [FlashcardOrderByInput!]) {
    flashcards(orderBy: $orderBy) {
      flashcards {
        id
        question
        answer
        isDone
        createdAt
        postedBy {
          name
          email
        }
      }
      count
      id
    }
  }
`;
