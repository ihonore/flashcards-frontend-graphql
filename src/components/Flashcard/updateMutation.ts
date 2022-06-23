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

export const DELETE_MUTATION = gql`
  mutation DeleteFlashcard($deleteFlashcardId: Int!) {
    deleteFlashcard(id: $deleteFlashcardId) {
      id
    }
  }
`;

export const MARKASDONE_MUTATION = gql`
  mutation MarkAsDone($updateFlashcardId: Int!, $isDone: Boolean) {
    updateFlashcard(id: $updateFlashcardId, isDone: $isDone) {
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
