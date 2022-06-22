import { gql } from '@apollo/client';

export const UPDATE_MUTATION = gql`
  mutation UpdateFlashcard(
    $updateFlashcardId: Int!
    $question: String
    $answer: String
  ) {
    updateFlashcard(
      id: $updateFlashcardId
      question: $question
      answer: $answer
    ) {
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
  }
`;
