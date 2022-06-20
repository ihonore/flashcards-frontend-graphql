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

export type FlashcardsQueryVariables = Exact<{ [key: string]: never; }>;


export type FlashcardsQuery = { __typename?: 'Query', flashcards: { __typename?: 'AllFlashcards', flashcards: Array<{ __typename?: 'Flashcard', id: number, question: string, answer: string, isDone: boolean, createdAt: any, postedBy?: { __typename?: 'User', email: string } | null }> } };


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