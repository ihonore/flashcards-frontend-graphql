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
