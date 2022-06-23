import { gql } from '@apollo/client';

export const QUERY_FILTER_FLASHCARDS = gql`
  query FilterFlashcards($filter: String) {
    flashcards(filter: $filter) {
      flashcards {
        question
        answer
        isDone
        createdAt
        id
        postedBy {
          id
          email
          name
        }
      }
      count
      id
    }
  }
`;
