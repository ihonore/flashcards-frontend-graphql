import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};

export type AllFlashcards = {
  __typename?: 'AllFlashcards';
  count: Scalars['Int'];
  flashcards: Array<Flashcard>;
  id?: Maybe<Scalars['ID']>;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
  user: User;
};

export type Flashcard = {
  __typename?: 'Flashcard';
  answer: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  isDone: Scalars['Boolean'];
  postedBy?: Maybe<User>;
  question: Scalars['String'];
};

export type FlashcardOrderByInput = {
  answer?: InputMaybe<Sort>;
  createdAt?: InputMaybe<Sort>;
  question?: InputMaybe<Sort>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createFlashcard: Flashcard;
  deleteFlashcard: Flashcard;
  login: AuthPayload;
  signup: AuthPayload;
  updateFlashcard: Flashcard;
};


export type MutationCreateFlashcardArgs = {
  answer: Scalars['String'];
  question: Scalars['String'];
};


export type MutationDeleteFlashcardArgs = {
  id: Scalars['Int'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignupArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpdateFlashcardArgs = {
  answer?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  isDone?: InputMaybe<Scalars['Boolean']>;
  question?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  flashcards: AllFlashcards;
};


export type QueryFlashcardsArgs = {
  filter?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<Array<FlashcardOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export enum Sort {
  Asc = 'asc',
  Desc = 'desc'
}

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  flashcards: Array<Flashcard>;
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type CreateFlashcardMutationVariables = Exact<{
  question: Scalars['String'];
  answer: Scalars['String'];
}>;


export type CreateFlashcardMutation = { __typename?: 'Mutation', createFlashcard: { __typename?: 'Flashcard', id: number, question: string, answer: string, isDone: boolean, createdAt: any, postedBy?: { __typename?: 'User', name: string, email: string } | null } };

export type UpdateFlashcardMutationVariables = Exact<{
  updateFlashcardId: Scalars['Int'];
  question?: InputMaybe<Scalars['String']>;
  answer?: InputMaybe<Scalars['String']>;
}>;


export type UpdateFlashcardMutation = { __typename?: 'Mutation', updateFlashcard: { __typename?: 'Flashcard', id: number, question: string, answer: string, isDone: boolean, createdAt: any, postedBy?: { __typename?: 'User', name: string, email: string } | null } };

export type DeleteFlashcardMutationVariables = Exact<{
  deleteFlashcardId: Scalars['Int'];
}>;


export type DeleteFlashcardMutation = { __typename?: 'Mutation', deleteFlashcard: { __typename?: 'Flashcard', id: number } };

export type MarkAsDoneMutationVariables = Exact<{
  updateFlashcardId: Scalars['Int'];
  isDone?: InputMaybe<Scalars['Boolean']>;
}>;


export type MarkAsDoneMutation = { __typename?: 'Mutation', updateFlashcard: { __typename?: 'Flashcard', id: number, question: string, answer: string, isDone: boolean, createdAt: any, postedBy?: { __typename?: 'User', name: string, email: string } | null } };

export type FlashcardsQueryVariables = Exact<{ [key: string]: never; }>;


export type FlashcardsQuery = { __typename?: 'Query', flashcards: { __typename?: 'AllFlashcards', flashcards: Array<{ __typename?: 'Flashcard', id: number, question: string, answer: string, isDone: boolean, createdAt: any, postedBy?: { __typename?: 'User', email: string } | null }> } };

export type OrderByQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<FlashcardOrderByInput> | FlashcardOrderByInput>;
}>;


export type OrderByQuery = { __typename?: 'Query', flashcards: { __typename?: 'AllFlashcards', count: number, id?: string | null, flashcards: Array<{ __typename?: 'Flashcard', id: number, question: string, answer: string, isDone: boolean, createdAt: any, postedBy?: { __typename?: 'User', name: string, email: string } | null }> } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthPayload', token: string, user: { __typename?: 'User', name: string, email: string } } };

export type SignupMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'AuthPayload', token: string, user: { __typename?: 'User', name: string, email: string } } };

export type FilterFlashcardsQueryVariables = Exact<{
  filter?: InputMaybe<Scalars['String']>;
}>;


export type FilterFlashcardsQuery = { __typename?: 'Query', flashcards: { __typename?: 'AllFlashcards', count: number, id?: string | null, flashcards: Array<{ __typename?: 'Flashcard', question: string, answer: string, isDone: boolean, createdAt: any, id: number, postedBy?: { __typename?: 'User', id: number, email: string, name: string } | null }> } };


export const CreateFlashcardDocument = gql`
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
export type CreateFlashcardMutationFn = Apollo.MutationFunction<CreateFlashcardMutation, CreateFlashcardMutationVariables>;

/**
 * __useCreateFlashcardMutation__
 *
 * To run a mutation, you first call `useCreateFlashcardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFlashcardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFlashcardMutation, { data, loading, error }] = useCreateFlashcardMutation({
 *   variables: {
 *      question: // value for 'question'
 *      answer: // value for 'answer'
 *   },
 * });
 */
export function useCreateFlashcardMutation(baseOptions?: Apollo.MutationHookOptions<CreateFlashcardMutation, CreateFlashcardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFlashcardMutation, CreateFlashcardMutationVariables>(CreateFlashcardDocument, options);
      }
export type CreateFlashcardMutationHookResult = ReturnType<typeof useCreateFlashcardMutation>;
export type CreateFlashcardMutationResult = Apollo.MutationResult<CreateFlashcardMutation>;
export type CreateFlashcardMutationOptions = Apollo.BaseMutationOptions<CreateFlashcardMutation, CreateFlashcardMutationVariables>;
export const UpdateFlashcardDocument = gql`
    mutation UpdateFlashcard($updateFlashcardId: Int!, $question: String, $answer: String) {
  updateFlashcard(id: $updateFlashcardId, question: $question, answer: $answer) {
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
export type UpdateFlashcardMutationFn = Apollo.MutationFunction<UpdateFlashcardMutation, UpdateFlashcardMutationVariables>;

/**
 * __useUpdateFlashcardMutation__
 *
 * To run a mutation, you first call `useUpdateFlashcardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFlashcardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFlashcardMutation, { data, loading, error }] = useUpdateFlashcardMutation({
 *   variables: {
 *      updateFlashcardId: // value for 'updateFlashcardId'
 *      question: // value for 'question'
 *      answer: // value for 'answer'
 *   },
 * });
 */
export function useUpdateFlashcardMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFlashcardMutation, UpdateFlashcardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFlashcardMutation, UpdateFlashcardMutationVariables>(UpdateFlashcardDocument, options);
      }
export type UpdateFlashcardMutationHookResult = ReturnType<typeof useUpdateFlashcardMutation>;
export type UpdateFlashcardMutationResult = Apollo.MutationResult<UpdateFlashcardMutation>;
export type UpdateFlashcardMutationOptions = Apollo.BaseMutationOptions<UpdateFlashcardMutation, UpdateFlashcardMutationVariables>;
export const DeleteFlashcardDocument = gql`
    mutation DeleteFlashcard($deleteFlashcardId: Int!) {
  deleteFlashcard(id: $deleteFlashcardId) {
    id
  }
}
    `;
export type DeleteFlashcardMutationFn = Apollo.MutationFunction<DeleteFlashcardMutation, DeleteFlashcardMutationVariables>;

/**
 * __useDeleteFlashcardMutation__
 *
 * To run a mutation, you first call `useDeleteFlashcardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFlashcardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFlashcardMutation, { data, loading, error }] = useDeleteFlashcardMutation({
 *   variables: {
 *      deleteFlashcardId: // value for 'deleteFlashcardId'
 *   },
 * });
 */
export function useDeleteFlashcardMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFlashcardMutation, DeleteFlashcardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFlashcardMutation, DeleteFlashcardMutationVariables>(DeleteFlashcardDocument, options);
      }
export type DeleteFlashcardMutationHookResult = ReturnType<typeof useDeleteFlashcardMutation>;
export type DeleteFlashcardMutationResult = Apollo.MutationResult<DeleteFlashcardMutation>;
export type DeleteFlashcardMutationOptions = Apollo.BaseMutationOptions<DeleteFlashcardMutation, DeleteFlashcardMutationVariables>;
export const MarkAsDoneDocument = gql`
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
export type MarkAsDoneMutationFn = Apollo.MutationFunction<MarkAsDoneMutation, MarkAsDoneMutationVariables>;

/**
 * __useMarkAsDoneMutation__
 *
 * To run a mutation, you first call `useMarkAsDoneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkAsDoneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markAsDoneMutation, { data, loading, error }] = useMarkAsDoneMutation({
 *   variables: {
 *      updateFlashcardId: // value for 'updateFlashcardId'
 *      isDone: // value for 'isDone'
 *   },
 * });
 */
export function useMarkAsDoneMutation(baseOptions?: Apollo.MutationHookOptions<MarkAsDoneMutation, MarkAsDoneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkAsDoneMutation, MarkAsDoneMutationVariables>(MarkAsDoneDocument, options);
      }
export type MarkAsDoneMutationHookResult = ReturnType<typeof useMarkAsDoneMutation>;
export type MarkAsDoneMutationResult = Apollo.MutationResult<MarkAsDoneMutation>;
export type MarkAsDoneMutationOptions = Apollo.BaseMutationOptions<MarkAsDoneMutation, MarkAsDoneMutationVariables>;
export const FlashcardsDocument = gql`
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

/**
 * __useFlashcardsQuery__
 *
 * To run a query within a React component, call `useFlashcardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFlashcardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFlashcardsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFlashcardsQuery(baseOptions?: Apollo.QueryHookOptions<FlashcardsQuery, FlashcardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FlashcardsQuery, FlashcardsQueryVariables>(FlashcardsDocument, options);
      }
export function useFlashcardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FlashcardsQuery, FlashcardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FlashcardsQuery, FlashcardsQueryVariables>(FlashcardsDocument, options);
        }
export type FlashcardsQueryHookResult = ReturnType<typeof useFlashcardsQuery>;
export type FlashcardsLazyQueryHookResult = ReturnType<typeof useFlashcardsLazyQuery>;
export type FlashcardsQueryResult = Apollo.QueryResult<FlashcardsQuery, FlashcardsQueryVariables>;
export const OrderByDocument = gql`
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

/**
 * __useOrderByQuery__
 *
 * To run a query within a React component, call `useOrderByQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderByQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderByQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useOrderByQuery(baseOptions?: Apollo.QueryHookOptions<OrderByQuery, OrderByQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrderByQuery, OrderByQueryVariables>(OrderByDocument, options);
      }
export function useOrderByLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrderByQuery, OrderByQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrderByQuery, OrderByQueryVariables>(OrderByDocument, options);
        }
export type OrderByQueryHookResult = ReturnType<typeof useOrderByQuery>;
export type OrderByLazyQueryHookResult = ReturnType<typeof useOrderByLazyQuery>;
export type OrderByQueryResult = Apollo.QueryResult<OrderByQuery, OrderByQueryVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      name
      email
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SignupDocument = gql`
    mutation Signup($email: String!, $password: String!, $name: String!) {
  signup(email: $email, password: $password, name: $name) {
    token
    user {
      name
      email
    }
  }
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const FilterFlashcardsDocument = gql`
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

/**
 * __useFilterFlashcardsQuery__
 *
 * To run a query within a React component, call `useFilterFlashcardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFilterFlashcardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFilterFlashcardsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useFilterFlashcardsQuery(baseOptions?: Apollo.QueryHookOptions<FilterFlashcardsQuery, FilterFlashcardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FilterFlashcardsQuery, FilterFlashcardsQueryVariables>(FilterFlashcardsDocument, options);
      }
export function useFilterFlashcardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FilterFlashcardsQuery, FilterFlashcardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FilterFlashcardsQuery, FilterFlashcardsQueryVariables>(FilterFlashcardsDocument, options);
        }
export type FilterFlashcardsQueryHookResult = ReturnType<typeof useFilterFlashcardsQuery>;
export type FilterFlashcardsLazyQueryHookResult = ReturnType<typeof useFilterFlashcardsLazyQuery>;
export type FilterFlashcardsQueryResult = Apollo.QueryResult<FilterFlashcardsQuery, FilterFlashcardsQueryVariables>;