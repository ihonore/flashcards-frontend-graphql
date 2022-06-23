import { gql } from '@apollo/client';

export const CREATE_MUTATION = gql`
  mutation CreateFlashcard($question: String!, $answer: String!) {
    createFlashcard(question: $question, answer: $answer) {
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
