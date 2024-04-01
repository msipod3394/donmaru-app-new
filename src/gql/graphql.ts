/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: { input: any; output: any; }
};

export type Dislike = {
  __typename?: 'Dislike';
  createdAt: Scalars['ISO8601DateTime']['output'];
  id: Scalars['ID']['output'];
  ingredient: Ingredient;
  updatedAt: Scalars['ISO8601DateTime']['output'];
  user: User;
};

export type Favorite = {
  __typename?: 'Favorite';
  createdAt: Scalars['ISO8601DateTime']['output'];
  id: Scalars['ID']['output'];
  item: Item;
  updatedAt: Scalars['ISO8601DateTime']['output'];
  user: User;
};

export type Ingredient = {
  __typename?: 'Ingredient';
  createdAt: Scalars['ISO8601DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['ISO8601DateTime']['output'];
};

export type Item = {
  __typename?: 'Item';
  createdAt: Scalars['ISO8601DateTime']['output'];
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['ISO8601DateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
};

export type Order = {
  __typename?: 'Order';
  createdAt: Scalars['ISO8601DateTime']['output'];
  id: Scalars['ID']['output'];
  item: Item;
  updatedAt: Scalars['ISO8601DateTime']['output'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  dislikes: Array<Dislike>;
  favorites: Array<Favorite>;
  ingredients: Array<Ingredient>;
  itemsAll: Array<Item>;
  itemsSearch: Array<Item>;
  orders: Array<Order>;
  users: Array<User>;
};


export type QueryDislikesArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryFavoritesArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryIngredientsArgs = {
  fieldName?: InputMaybe<Scalars['String']['input']>;
  fieldValue?: InputMaybe<Scalars['String']['input']>;
};


export type QueryItemsAllArgs = {
  fieldName?: InputMaybe<Scalars['String']['input']>;
  fieldValue?: InputMaybe<Scalars['String']['input']>;
};


export type QueryItemsSearchArgs = {
  fieldName?: InputMaybe<Scalars['String']['input']>;
  fieldValue?: InputMaybe<Scalars['String']['input']>;
};


export type QueryOrdersArgs = {
  fieldName?: InputMaybe<Scalars['String']['input']>;
  fieldValue?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUsersArgs = {
  fieldName?: InputMaybe<Scalars['String']['input']>;
  fieldValue?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['ISO8601DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  password: Scalars['String']['output'];
  updatedAt: Scalars['ISO8601DateTime']['output'];
  userName: Scalars['String']['output'];
};

export type GetIngredientsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetIngredientsQuery = { __typename?: 'Query', ingredients: Array<{ __typename?: 'Ingredient', id: string }> };


export const GetIngredientsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetIngredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetIngredientsQuery, GetIngredientsQueryVariables>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: { input: any; output: any; }
};

export type Dislike = {
  __typename?: 'Dislike';
  createdAt: Scalars['ISO8601DateTime']['output'];
  id: Scalars['ID']['output'];
  ingredient: Ingredient;
  updatedAt: Scalars['ISO8601DateTime']['output'];
  user: User;
};

export type Favorite = {
  __typename?: 'Favorite';
  createdAt: Scalars['ISO8601DateTime']['output'];
  id: Scalars['ID']['output'];
  item: Item;
  updatedAt: Scalars['ISO8601DateTime']['output'];
  user: User;
};

export type Ingredient = {
  __typename?: 'Ingredient';
  createdAt: Scalars['ISO8601DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['ISO8601DateTime']['output'];
};

export type Item = {
  __typename?: 'Item';
  createdAt: Scalars['ISO8601DateTime']['output'];
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['ISO8601DateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
};

export type Order = {
  __typename?: 'Order';
  createdAt: Scalars['ISO8601DateTime']['output'];
  id: Scalars['ID']['output'];
  item: Item;
  updatedAt: Scalars['ISO8601DateTime']['output'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  dislikes: Array<Dislike>;
  favorites: Array<Favorite>;
  ingredients: Array<Ingredient>;
  itemsAll: Array<Item>;
  itemsSearch: Array<Item>;
  orders: Array<Order>;
  users: Array<User>;
};


export type QueryDislikesArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryFavoritesArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryIngredientsArgs = {
  fieldName?: InputMaybe<Scalars['String']['input']>;
  fieldValue?: InputMaybe<Scalars['String']['input']>;
};


export type QueryItemsAllArgs = {
  fieldName?: InputMaybe<Scalars['String']['input']>;
  fieldValue?: InputMaybe<Scalars['String']['input']>;
};


export type QueryItemsSearchArgs = {
  fieldName?: InputMaybe<Scalars['String']['input']>;
  fieldValue?: InputMaybe<Scalars['String']['input']>;
};


export type QueryOrdersArgs = {
  fieldName?: InputMaybe<Scalars['String']['input']>;
  fieldValue?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUsersArgs = {
  fieldName?: InputMaybe<Scalars['String']['input']>;
  fieldValue?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['ISO8601DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  password: Scalars['String']['output'];
  updatedAt: Scalars['ISO8601DateTime']['output'];
  userName: Scalars['String']['output'];
};

export type GetIngredientsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetIngredientsQuery = { __typename?: 'Query', ingredients: Array<{ __typename?: 'Ingredient', id: string }> };


export const GetIngredientsDocument = gql`
    query GetIngredients {
  ingredients {
    id
  }
}
    `;

/**
 * __useGetIngredientsQuery__
 *
 * To run a query within a React component, call `useGetIngredientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetIngredientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetIngredientsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetIngredientsQuery(baseOptions?: Apollo.QueryHookOptions<GetIngredientsQuery, GetIngredientsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetIngredientsQuery, GetIngredientsQueryVariables>(GetIngredientsDocument, options);
      }
export function useGetIngredientsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetIngredientsQuery, GetIngredientsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetIngredientsQuery, GetIngredientsQueryVariables>(GetIngredientsDocument, options);
        }
export function useGetIngredientsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetIngredientsQuery, GetIngredientsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetIngredientsQuery, GetIngredientsQueryVariables>(GetIngredientsDocument, options);
        }
export type GetIngredientsQueryHookResult = ReturnType<typeof useGetIngredientsQuery>;
export type GetIngredientsLazyQueryHookResult = ReturnType<typeof useGetIngredientsLazyQuery>;
export type GetIngredientsSuspenseQueryHookResult = ReturnType<typeof useGetIngredientsSuspenseQuery>;
export type GetIngredientsQueryResult = Apollo.QueryResult<GetIngredientsQuery, GetIngredientsQueryVariables>;
