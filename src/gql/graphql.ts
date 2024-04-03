import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHoc from '@apollo/client/react/hoc';
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

export type IngredientItem = {
  __typename?: 'IngredientItem';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Item = {
  __typename?: 'Item';
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  ingredients: Array<IngredientItem>;
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
  userName: Scalars['String']['input'];
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
  items: Array<Item>;
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


export type QueryItemsArgs = {
  fieldName?: InputMaybe<Scalars['String']['input']>;
  fieldValue?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
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

export type CreateUserMutationVariables = Exact<{
  userName: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, userName: string, email: string } };

export type FetchUserQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchUserQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, userName: string, email: string }> };

export type GetItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetItemsQuery = { __typename?: 'Query', items: Array<{ __typename?: 'Item', id: string, name: string, image: string, ingredients: Array<{ __typename?: 'IngredientItem', id: string, name: string }> }> };

export type SearchItemsByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;


export type SearchItemsByIdQuery = { __typename?: 'Query', items: Array<{ __typename?: 'Item', id: string, name: string, image: string, ingredients: Array<{ __typename?: 'IngredientItem', id: string, name: string }> }> };


export const GetIngredientsDocument = gql`
    query GetIngredients {
  ingredients {
    id
  }
}
    `;
export type GetIngredientsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetIngredientsQuery, GetIngredientsQueryVariables>
    } & TChildProps;
export function withGetIngredients<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetIngredientsQuery,
  GetIngredientsQueryVariables,
  GetIngredientsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetIngredientsQuery, GetIngredientsQueryVariables, GetIngredientsProps<TChildProps, TDataName>>(GetIngredientsDocument, {
      alias: 'getIngredients',
      ...operationOptions
    });
};

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
export const CreateUserDocument = gql`
    mutation CreateUser($userName: String!, $email: String!) {
  createUser(userName: $userName, email: $email) {
    id
    userName
    email
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;
export type CreateUserProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>
    } & TChildProps;
export function withCreateUser<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateUserMutation,
  CreateUserMutationVariables,
  CreateUserProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, CreateUserMutation, CreateUserMutationVariables, CreateUserProps<TChildProps, TDataName>>(CreateUserDocument, {
      alias: 'createUser',
      ...operationOptions
    });
};

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      userName: // value for 'userName'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const FetchUserDocument = gql`
    query FetchUser {
  users {
    id
    userName
    email
  }
}
    `;
export type FetchUserProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<FetchUserQuery, FetchUserQueryVariables>
    } & TChildProps;
export function withFetchUser<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  FetchUserQuery,
  FetchUserQueryVariables,
  FetchUserProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, FetchUserQuery, FetchUserQueryVariables, FetchUserProps<TChildProps, TDataName>>(FetchUserDocument, {
      alias: 'fetchUser',
      ...operationOptions
    });
};

/**
 * __useFetchUserQuery__
 *
 * To run a query within a React component, call `useFetchUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchUserQuery(baseOptions?: Apollo.QueryHookOptions<FetchUserQuery, FetchUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchUserQuery, FetchUserQueryVariables>(FetchUserDocument, options);
      }
export function useFetchUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchUserQuery, FetchUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchUserQuery, FetchUserQueryVariables>(FetchUserDocument, options);
        }
export function useFetchUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FetchUserQuery, FetchUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FetchUserQuery, FetchUserQueryVariables>(FetchUserDocument, options);
        }
export type FetchUserQueryHookResult = ReturnType<typeof useFetchUserQuery>;
export type FetchUserLazyQueryHookResult = ReturnType<typeof useFetchUserLazyQuery>;
export type FetchUserSuspenseQueryHookResult = ReturnType<typeof useFetchUserSuspenseQuery>;
export type FetchUserQueryResult = Apollo.QueryResult<FetchUserQuery, FetchUserQueryVariables>;
export const GetItemsDocument = gql`
    query GetItems {
  items {
    id
    name
    image
    ingredients {
      id
      name
    }
  }
}
    `;
export type GetItemsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetItemsQuery, GetItemsQueryVariables>
    } & TChildProps;
export function withGetItems<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetItemsQuery,
  GetItemsQueryVariables,
  GetItemsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetItemsQuery, GetItemsQueryVariables, GetItemsProps<TChildProps, TDataName>>(GetItemsDocument, {
      alias: 'getItems',
      ...operationOptions
    });
};

/**
 * __useGetItemsQuery__
 *
 * To run a query within a React component, call `useGetItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetItemsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetItemsQuery(baseOptions?: Apollo.QueryHookOptions<GetItemsQuery, GetItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetItemsQuery, GetItemsQueryVariables>(GetItemsDocument, options);
      }
export function useGetItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetItemsQuery, GetItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetItemsQuery, GetItemsQueryVariables>(GetItemsDocument, options);
        }
export function useGetItemsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetItemsQuery, GetItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetItemsQuery, GetItemsQueryVariables>(GetItemsDocument, options);
        }
export type GetItemsQueryHookResult = ReturnType<typeof useGetItemsQuery>;
export type GetItemsLazyQueryHookResult = ReturnType<typeof useGetItemsLazyQuery>;
export type GetItemsSuspenseQueryHookResult = ReturnType<typeof useGetItemsSuspenseQuery>;
export type GetItemsQueryResult = Apollo.QueryResult<GetItemsQuery, GetItemsQueryVariables>;
export const SearchItemsByIdDocument = gql`
    query SearchItemsById($id: ID) {
  items(id: $id) {
    id
    name
    image
    ingredients {
      id
      name
    }
  }
}
    `;
export type SearchItemsByIdProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<SearchItemsByIdQuery, SearchItemsByIdQueryVariables>
    } & TChildProps;
export function withSearchItemsById<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  SearchItemsByIdQuery,
  SearchItemsByIdQueryVariables,
  SearchItemsByIdProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, SearchItemsByIdQuery, SearchItemsByIdQueryVariables, SearchItemsByIdProps<TChildProps, TDataName>>(SearchItemsByIdDocument, {
      alias: 'searchItemsById',
      ...operationOptions
    });
};

/**
 * __useSearchItemsByIdQuery__
 *
 * To run a query within a React component, call `useSearchItemsByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchItemsByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchItemsByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSearchItemsByIdQuery(baseOptions?: Apollo.QueryHookOptions<SearchItemsByIdQuery, SearchItemsByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchItemsByIdQuery, SearchItemsByIdQueryVariables>(SearchItemsByIdDocument, options);
      }
export function useSearchItemsByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchItemsByIdQuery, SearchItemsByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchItemsByIdQuery, SearchItemsByIdQueryVariables>(SearchItemsByIdDocument, options);
        }
export function useSearchItemsByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchItemsByIdQuery, SearchItemsByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchItemsByIdQuery, SearchItemsByIdQueryVariables>(SearchItemsByIdDocument, options);
        }
export type SearchItemsByIdQueryHookResult = ReturnType<typeof useSearchItemsByIdQuery>;
export type SearchItemsByIdLazyQueryHookResult = ReturnType<typeof useSearchItemsByIdLazyQuery>;
export type SearchItemsByIdSuspenseQueryHookResult = ReturnType<typeof useSearchItemsByIdSuspenseQuery>;
export type SearchItemsByIdQueryResult = Apollo.QueryResult<SearchItemsByIdQuery, SearchItemsByIdQueryVariables>;