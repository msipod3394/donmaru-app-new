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
  createdAt: Scalars['ISO8601DateTime']['output'];
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  ingredients: Array<IngredientItem>;
  name: Scalars['String']['output'];
  updatedAt: Scalars['ISO8601DateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createDislike: Dislike;
  createFavorite: Favorite;
  createOrder: Order;
  createUser: User;
};


export type MutationCreateDislikeArgs = {
  ingredientId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationCreateFavoriteArgs = {
  itemId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationCreateOrderArgs = {
  itemId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
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
  /** emailを指定して検索、emailの指定がなければ全件取得 */
  dislikes: Array<Dislike>;
  favorites: Array<Favorite>;
  ingredients: Array<Ingredient>;
  items: Array<Item>;
  /** emailを指定して検索、emailの指定がなければ全件取得 */
  order: Array<Order>;
  users: Array<User>;
};


export type QueryDislikesArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
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


export type QueryOrderArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
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

export type FetchDislikeByEmailQueryVariables = Exact<{
  email?: InputMaybe<Scalars['String']['input']>;
}>;


export type FetchDislikeByEmailQuery = { __typename?: 'Query', dislikes: Array<{ __typename?: 'Dislike', ingredient: { __typename?: 'Ingredient', id: string } }> };

export type FetchIngredientsQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchIngredientsQuery = { __typename?: 'Query', ingredients: Array<{ __typename?: 'Ingredient', id: string, name: string }> };

export type GetItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetItemsQuery = { __typename?: 'Query', items: Array<{ __typename?: 'Item', id: string, name: string, image: string, ingredients: Array<{ __typename?: 'IngredientItem', id: string, name: string }> }> };

export type AddDislikeMutationVariables = Exact<{
  ingredientId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;


export type AddDislikeMutation = { __typename?: 'Mutation', createDislike: { __typename?: 'Dislike', id: string, createdAt: any, updatedAt: any, ingredient: { __typename?: 'Ingredient', id: string }, user: { __typename?: 'User', id: string } } };

export type SearchOrderByUserEmailQueryVariables = Exact<{
  email?: InputMaybe<Scalars['String']['input']>;
}>;


export type SearchOrderByUserEmailQuery = { __typename?: 'Query', order: Array<{ __typename?: 'Order', id: string, updatedAt: any, item: { __typename?: 'Item', id: string, name: string, image: string, ingredients: Array<{ __typename?: 'IngredientItem', name: string }> }, user: { __typename?: 'User', id: string, email: string } }> };

export type SearchItemsByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;


export type SearchItemsByIdQuery = { __typename?: 'Query', items: Array<{ __typename?: 'Item', id: string, name: string, image: string, ingredients: Array<{ __typename?: 'IngredientItem', id: string, name: string }> }> };

export type CreateOrderMutationVariables = Exact<{
  itemId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder: { __typename?: 'Order', id: string, createdAt: any, updatedAt: any, item: { __typename?: 'Item', id: string, name: string, image: string }, user: { __typename?: 'User', id: string, userName: string } } };


export const FetchDislikeByEmailDocument = gql`
    query fetchDislikeByEmail($email: String) {
  dislikes(email: $email) {
    ingredient {
      id
    }
  }
}
    `;
export type FetchDislikeByEmailProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<FetchDislikeByEmailQuery, FetchDislikeByEmailQueryVariables>
    } & TChildProps;
export function withFetchDislikeByEmail<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  FetchDislikeByEmailQuery,
  FetchDislikeByEmailQueryVariables,
  FetchDislikeByEmailProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, FetchDislikeByEmailQuery, FetchDislikeByEmailQueryVariables, FetchDislikeByEmailProps<TChildProps, TDataName>>(FetchDislikeByEmailDocument, {
      alias: 'fetchDislikeByEmail',
      ...operationOptions
    });
};

/**
 * __useFetchDislikeByEmailQuery__
 *
 * To run a query within a React component, call `useFetchDislikeByEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchDislikeByEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchDislikeByEmailQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useFetchDislikeByEmailQuery(baseOptions?: Apollo.QueryHookOptions<FetchDislikeByEmailQuery, FetchDislikeByEmailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchDislikeByEmailQuery, FetchDislikeByEmailQueryVariables>(FetchDislikeByEmailDocument, options);
      }
export function useFetchDislikeByEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchDislikeByEmailQuery, FetchDislikeByEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchDislikeByEmailQuery, FetchDislikeByEmailQueryVariables>(FetchDislikeByEmailDocument, options);
        }
export function useFetchDislikeByEmailSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FetchDislikeByEmailQuery, FetchDislikeByEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FetchDislikeByEmailQuery, FetchDislikeByEmailQueryVariables>(FetchDislikeByEmailDocument, options);
        }
export type FetchDislikeByEmailQueryHookResult = ReturnType<typeof useFetchDislikeByEmailQuery>;
export type FetchDislikeByEmailLazyQueryHookResult = ReturnType<typeof useFetchDislikeByEmailLazyQuery>;
export type FetchDislikeByEmailSuspenseQueryHookResult = ReturnType<typeof useFetchDislikeByEmailSuspenseQuery>;
export type FetchDislikeByEmailQueryResult = Apollo.QueryResult<FetchDislikeByEmailQuery, FetchDislikeByEmailQueryVariables>;
export const FetchIngredientsDocument = gql`
    query fetchIngredients {
  ingredients {
    id
    name
  }
}
    `;
export type FetchIngredientsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<FetchIngredientsQuery, FetchIngredientsQueryVariables>
    } & TChildProps;
export function withFetchIngredients<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  FetchIngredientsQuery,
  FetchIngredientsQueryVariables,
  FetchIngredientsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, FetchIngredientsQuery, FetchIngredientsQueryVariables, FetchIngredientsProps<TChildProps, TDataName>>(FetchIngredientsDocument, {
      alias: 'fetchIngredients',
      ...operationOptions
    });
};

/**
 * __useFetchIngredientsQuery__
 *
 * To run a query within a React component, call `useFetchIngredientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchIngredientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchIngredientsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchIngredientsQuery(baseOptions?: Apollo.QueryHookOptions<FetchIngredientsQuery, FetchIngredientsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchIngredientsQuery, FetchIngredientsQueryVariables>(FetchIngredientsDocument, options);
      }
export function useFetchIngredientsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchIngredientsQuery, FetchIngredientsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchIngredientsQuery, FetchIngredientsQueryVariables>(FetchIngredientsDocument, options);
        }
export function useFetchIngredientsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FetchIngredientsQuery, FetchIngredientsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FetchIngredientsQuery, FetchIngredientsQueryVariables>(FetchIngredientsDocument, options);
        }
export type FetchIngredientsQueryHookResult = ReturnType<typeof useFetchIngredientsQuery>;
export type FetchIngredientsLazyQueryHookResult = ReturnType<typeof useFetchIngredientsLazyQuery>;
export type FetchIngredientsSuspenseQueryHookResult = ReturnType<typeof useFetchIngredientsSuspenseQuery>;
export type FetchIngredientsQueryResult = Apollo.QueryResult<FetchIngredientsQuery, FetchIngredientsQueryVariables>;
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
export const AddDislikeDocument = gql`
    mutation addDislike($ingredientId: String!, $userId: String!) {
  createDislike(ingredientId: $ingredientId, userId: $userId) {
    id
    ingredient {
      id
    }
    user {
      id
    }
    createdAt
    updatedAt
  }
}
    `;
export type AddDislikeMutationFn = Apollo.MutationFunction<AddDislikeMutation, AddDislikeMutationVariables>;
export type AddDislikeProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<AddDislikeMutation, AddDislikeMutationVariables>
    } & TChildProps;
export function withAddDislike<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddDislikeMutation,
  AddDislikeMutationVariables,
  AddDislikeProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, AddDislikeMutation, AddDislikeMutationVariables, AddDislikeProps<TChildProps, TDataName>>(AddDislikeDocument, {
      alias: 'addDislike',
      ...operationOptions
    });
};

/**
 * __useAddDislikeMutation__
 *
 * To run a mutation, you first call `useAddDislikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddDislikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addDislikeMutation, { data, loading, error }] = useAddDislikeMutation({
 *   variables: {
 *      ingredientId: // value for 'ingredientId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useAddDislikeMutation(baseOptions?: Apollo.MutationHookOptions<AddDislikeMutation, AddDislikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddDislikeMutation, AddDislikeMutationVariables>(AddDislikeDocument, options);
      }
export type AddDislikeMutationHookResult = ReturnType<typeof useAddDislikeMutation>;
export type AddDislikeMutationResult = Apollo.MutationResult<AddDislikeMutation>;
export type AddDislikeMutationOptions = Apollo.BaseMutationOptions<AddDislikeMutation, AddDislikeMutationVariables>;
export const SearchOrderByUserEmailDocument = gql`
    query SearchOrderByUserEmail($email: String) {
  order(email: $email) {
    id
    updatedAt
    item {
      id
      name
      image
      ingredients {
        name
      }
    }
    user {
      id
      email
    }
  }
}
    `;
export type SearchOrderByUserEmailProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<SearchOrderByUserEmailQuery, SearchOrderByUserEmailQueryVariables>
    } & TChildProps;
export function withSearchOrderByUserEmail<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  SearchOrderByUserEmailQuery,
  SearchOrderByUserEmailQueryVariables,
  SearchOrderByUserEmailProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, SearchOrderByUserEmailQuery, SearchOrderByUserEmailQueryVariables, SearchOrderByUserEmailProps<TChildProps, TDataName>>(SearchOrderByUserEmailDocument, {
      alias: 'searchOrderByUserEmail',
      ...operationOptions
    });
};

/**
 * __useSearchOrderByUserEmailQuery__
 *
 * To run a query within a React component, call `useSearchOrderByUserEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchOrderByUserEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchOrderByUserEmailQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSearchOrderByUserEmailQuery(baseOptions?: Apollo.QueryHookOptions<SearchOrderByUserEmailQuery, SearchOrderByUserEmailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchOrderByUserEmailQuery, SearchOrderByUserEmailQueryVariables>(SearchOrderByUserEmailDocument, options);
      }
export function useSearchOrderByUserEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchOrderByUserEmailQuery, SearchOrderByUserEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchOrderByUserEmailQuery, SearchOrderByUserEmailQueryVariables>(SearchOrderByUserEmailDocument, options);
        }
export function useSearchOrderByUserEmailSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchOrderByUserEmailQuery, SearchOrderByUserEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchOrderByUserEmailQuery, SearchOrderByUserEmailQueryVariables>(SearchOrderByUserEmailDocument, options);
        }
export type SearchOrderByUserEmailQueryHookResult = ReturnType<typeof useSearchOrderByUserEmailQuery>;
export type SearchOrderByUserEmailLazyQueryHookResult = ReturnType<typeof useSearchOrderByUserEmailLazyQuery>;
export type SearchOrderByUserEmailSuspenseQueryHookResult = ReturnType<typeof useSearchOrderByUserEmailSuspenseQuery>;
export type SearchOrderByUserEmailQueryResult = Apollo.QueryResult<SearchOrderByUserEmailQuery, SearchOrderByUserEmailQueryVariables>;
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
export const CreateOrderDocument = gql`
    mutation CreateOrder($itemId: String!, $userId: String!) {
  createOrder(itemId: $itemId, userId: $userId) {
    id
    item {
      id
      name
      image
    }
    user {
      id
      userName
    }
    createdAt
    updatedAt
  }
}
    `;
export type CreateOrderMutationFn = Apollo.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>;
export type CreateOrderProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>
    } & TChildProps;
export function withCreateOrder<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateOrderMutation,
  CreateOrderMutationVariables,
  CreateOrderProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, CreateOrderMutation, CreateOrderMutationVariables, CreateOrderProps<TChildProps, TDataName>>(CreateOrderDocument, {
      alias: 'createOrder',
      ...operationOptions
    });
};

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      itemId: // value for 'itemId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useCreateOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, options);
      }
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
export type CreateOrderMutationResult = Apollo.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<CreateOrderMutation, CreateOrderMutationVariables>;