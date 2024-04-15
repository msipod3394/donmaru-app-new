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
  id: Scalars['String']['output'];
  ingredient: Ingredient;
  success?: Maybe<Scalars['Boolean']['output']>;
  updatedAt: Scalars['ISO8601DateTime']['output'];
  user: User;
};

export type Favorite = {
  __typename?: 'Favorite';
  createdAt: Scalars['ISO8601DateTime']['output'];
  id: Scalars['String']['output'];
  item: Item;
  success?: Maybe<Scalars['Boolean']['output']>;
  updatedAt: Scalars['ISO8601DateTime']['output'];
  user: User;
};

export type Ingredient = {
  __typename?: 'Ingredient';
  createdAt: Scalars['ISO8601DateTime']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['ISO8601DateTime']['output'];
};

export type IngredientItem = {
  __typename?: 'IngredientItem';
  id: Scalars['String']['output'];
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
  createDislikes: Array<Dislike>;
  createFavorite: Favorite;
  createFavorites: Array<Favorite>;
  createOrder: Order;
  createUser: User;
  deleteDislikes: Scalars['Boolean']['output'];
  deleteFavorites: Scalars['Boolean']['output'];
};


export type MutationCreateDislikesArgs = {
  ingredientIds: Array<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};


export type MutationCreateFavoriteArgs = {
  itemId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationCreateFavoritesArgs = {
  itemIds: Array<Scalars['String']['input']>;
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


export type MutationDeleteDislikesArgs = {
  ingredientIds: Array<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};


export type MutationDeleteFavoritesArgs = {
  itemIds: Array<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
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
  /** emailを指定して検索 */
  dislikes: Array<Dislike>;
  favorites: Array<Favorite>;
  getUser?: Maybe<User>;
  ingredients: Array<Ingredient>;
  items: Array<Item>;
  /** ユーザーIDを指定して検索 */
  order: Array<Order>;
};


export type QueryDislikesArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFavoritesArgs = {
  itemId?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetUserArgs = {
  email: Scalars['String']['input'];
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
  userId: Scalars['String']['input'];
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

export type AddDislikesMutationVariables = Exact<{
  ingredientIds: Array<Scalars['String']['input']> | Scalars['String']['input'];
  id: Scalars['String']['input'];
}>;


export type AddDislikesMutation = { __typename?: 'Mutation', createDislikes: Array<{ __typename?: 'Dislike', id: string, createdAt: any, updatedAt: any, ingredient: { __typename?: 'Ingredient', id: string }, user: { __typename?: 'User', id: string } }> };

export type DeleteDislikeMutationVariables = Exact<{
  ingredientIds: Array<Scalars['String']['input']> | Scalars['String']['input'];
  id: Scalars['String']['input'];
}>;


export type DeleteDislikeMutation = { __typename?: 'Mutation', deleteDislikes: boolean };

export type AddFavoritesMutationVariables = Exact<{
  itemIds: Array<Scalars['String']['input']> | Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;


export type AddFavoritesMutation = { __typename?: 'Mutation', createFavorites: Array<{ __typename?: 'Favorite', id: string, createdAt: any, updatedAt: any, item: { __typename?: 'Item', id: string, name: string }, user: { __typename?: 'User', id: string } }> };

export type DeleteFavoritesMutationVariables = Exact<{
  itemIds: Array<Scalars['String']['input']> | Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;


export type DeleteFavoritesMutation = { __typename?: 'Mutation', deleteFavorites: boolean };

export type FetchDislikeByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']['input']>;
}>;


export type FetchDislikeByIdQuery = { __typename?: 'Query', dislikes: Array<{ __typename?: 'Dislike', ingredient: { __typename?: 'Ingredient', id: string } }> };

export type FetchFavoriteByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']['input']>;
}>;


export type FetchFavoriteByIdQuery = { __typename?: 'Query', favorites: Array<{ __typename?: 'Favorite', id: string, createdAt: any, updatedAt: any, item: { __typename?: 'Item', id: string, name: string, image: string, createdAt: any, updatedAt: any, ingredients: Array<{ __typename?: 'IngredientItem', id: string, name: string }> }, user: { __typename?: 'User', id: string } }> };

export type FetchIngredientsQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchIngredientsQuery = { __typename?: 'Query', ingredients: Array<{ __typename?: 'Ingredient', id: string, name: string }> };

export type FetchItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchItemsQuery = { __typename?: 'Query', items: Array<{ __typename?: 'Item', id: string, name: string, image: string, createdAt: any, updatedAt: any, ingredients: Array<{ __typename?: 'IngredientItem', id: string, name: string }> }> };

export type FetchOrderByIdQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type FetchOrderByIdQuery = { __typename?: 'Query', order: Array<{ __typename?: 'Order', id: string, createdAt: any, updatedAt: any, item: { __typename?: 'Item', id: string, name: string, image: string, createdAt: any, updatedAt: any }, user: { __typename?: 'User', id: string, email: string } }> };

export type SearchItemsByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;


export type SearchItemsByIdQuery = { __typename?: 'Query', items: Array<{ __typename?: 'Item', id: string, name: string, image: string, ingredients: Array<{ __typename?: 'IngredientItem', id: string, name: string }> }> };

export type CreateOrderMutationVariables = Exact<{
  itemId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder: { __typename?: 'Order', id: string, item: { __typename?: 'Item', id: string }, user: { __typename?: 'User', id: string } } };


export const AddDislikesDocument = gql`
    mutation addDislikes($ingredientIds: [String!]!, $id: String!) {
  createDislikes(ingredientIds: $ingredientIds, userId: $id) {
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
export type AddDislikesMutationFn = Apollo.MutationFunction<AddDislikesMutation, AddDislikesMutationVariables>;
export type AddDislikesProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<AddDislikesMutation, AddDislikesMutationVariables>
    } & TChildProps;
export function withAddDislikes<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddDislikesMutation,
  AddDislikesMutationVariables,
  AddDislikesProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, AddDislikesMutation, AddDislikesMutationVariables, AddDislikesProps<TChildProps, TDataName>>(AddDislikesDocument, {
      alias: 'addDislikes',
      ...operationOptions
    });
};

/**
 * __useAddDislikesMutation__
 *
 * To run a mutation, you first call `useAddDislikesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddDislikesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addDislikesMutation, { data, loading, error }] = useAddDislikesMutation({
 *   variables: {
 *      ingredientIds: // value for 'ingredientIds'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAddDislikesMutation(baseOptions?: Apollo.MutationHookOptions<AddDislikesMutation, AddDislikesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddDislikesMutation, AddDislikesMutationVariables>(AddDislikesDocument, options);
      }
export type AddDislikesMutationHookResult = ReturnType<typeof useAddDislikesMutation>;
export type AddDislikesMutationResult = Apollo.MutationResult<AddDislikesMutation>;
export type AddDislikesMutationOptions = Apollo.BaseMutationOptions<AddDislikesMutation, AddDislikesMutationVariables>;
export const DeleteDislikeDocument = gql`
    mutation deleteDislike($ingredientIds: [String!]!, $id: String!) {
  deleteDislikes(ingredientIds: $ingredientIds, userId: $id)
}
    `;
export type DeleteDislikeMutationFn = Apollo.MutationFunction<DeleteDislikeMutation, DeleteDislikeMutationVariables>;
export type DeleteDislikeProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<DeleteDislikeMutation, DeleteDislikeMutationVariables>
    } & TChildProps;
export function withDeleteDislike<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteDislikeMutation,
  DeleteDislikeMutationVariables,
  DeleteDislikeProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteDislikeMutation, DeleteDislikeMutationVariables, DeleteDislikeProps<TChildProps, TDataName>>(DeleteDislikeDocument, {
      alias: 'deleteDislike',
      ...operationOptions
    });
};

/**
 * __useDeleteDislikeMutation__
 *
 * To run a mutation, you first call `useDeleteDislikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDislikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDislikeMutation, { data, loading, error }] = useDeleteDislikeMutation({
 *   variables: {
 *      ingredientIds: // value for 'ingredientIds'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteDislikeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteDislikeMutation, DeleteDislikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteDislikeMutation, DeleteDislikeMutationVariables>(DeleteDislikeDocument, options);
      }
export type DeleteDislikeMutationHookResult = ReturnType<typeof useDeleteDislikeMutation>;
export type DeleteDislikeMutationResult = Apollo.MutationResult<DeleteDislikeMutation>;
export type DeleteDislikeMutationOptions = Apollo.BaseMutationOptions<DeleteDislikeMutation, DeleteDislikeMutationVariables>;
export const AddFavoritesDocument = gql`
    mutation addFavorites($itemIds: [String!]!, $userId: String!) {
  createFavorites(itemIds: $itemIds, userId: $userId) {
    id
    item {
      id
      name
    }
    user {
      id
    }
    createdAt
    updatedAt
  }
}
    `;
export type AddFavoritesMutationFn = Apollo.MutationFunction<AddFavoritesMutation, AddFavoritesMutationVariables>;
export type AddFavoritesProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<AddFavoritesMutation, AddFavoritesMutationVariables>
    } & TChildProps;
export function withAddFavorites<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddFavoritesMutation,
  AddFavoritesMutationVariables,
  AddFavoritesProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, AddFavoritesMutation, AddFavoritesMutationVariables, AddFavoritesProps<TChildProps, TDataName>>(AddFavoritesDocument, {
      alias: 'addFavorites',
      ...operationOptions
    });
};

/**
 * __useAddFavoritesMutation__
 *
 * To run a mutation, you first call `useAddFavoritesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddFavoritesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addFavoritesMutation, { data, loading, error }] = useAddFavoritesMutation({
 *   variables: {
 *      itemIds: // value for 'itemIds'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useAddFavoritesMutation(baseOptions?: Apollo.MutationHookOptions<AddFavoritesMutation, AddFavoritesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddFavoritesMutation, AddFavoritesMutationVariables>(AddFavoritesDocument, options);
      }
export type AddFavoritesMutationHookResult = ReturnType<typeof useAddFavoritesMutation>;
export type AddFavoritesMutationResult = Apollo.MutationResult<AddFavoritesMutation>;
export type AddFavoritesMutationOptions = Apollo.BaseMutationOptions<AddFavoritesMutation, AddFavoritesMutationVariables>;
export const DeleteFavoritesDocument = gql`
    mutation deleteFavorites($itemIds: [String!]!, $userId: String!) {
  deleteFavorites(itemIds: $itemIds, userId: $userId)
}
    `;
export type DeleteFavoritesMutationFn = Apollo.MutationFunction<DeleteFavoritesMutation, DeleteFavoritesMutationVariables>;
export type DeleteFavoritesProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<DeleteFavoritesMutation, DeleteFavoritesMutationVariables>
    } & TChildProps;
export function withDeleteFavorites<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteFavoritesMutation,
  DeleteFavoritesMutationVariables,
  DeleteFavoritesProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteFavoritesMutation, DeleteFavoritesMutationVariables, DeleteFavoritesProps<TChildProps, TDataName>>(DeleteFavoritesDocument, {
      alias: 'deleteFavorites',
      ...operationOptions
    });
};

/**
 * __useDeleteFavoritesMutation__
 *
 * To run a mutation, you first call `useDeleteFavoritesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFavoritesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFavoritesMutation, { data, loading, error }] = useDeleteFavoritesMutation({
 *   variables: {
 *      itemIds: // value for 'itemIds'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDeleteFavoritesMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFavoritesMutation, DeleteFavoritesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFavoritesMutation, DeleteFavoritesMutationVariables>(DeleteFavoritesDocument, options);
      }
export type DeleteFavoritesMutationHookResult = ReturnType<typeof useDeleteFavoritesMutation>;
export type DeleteFavoritesMutationResult = Apollo.MutationResult<DeleteFavoritesMutation>;
export type DeleteFavoritesMutationOptions = Apollo.BaseMutationOptions<DeleteFavoritesMutation, DeleteFavoritesMutationVariables>;
export const FetchDislikeByIdDocument = gql`
    query fetchDislikeById($id: String) {
  dislikes(userId: $id) {
    ingredient {
      id
    }
  }
}
    `;
export type FetchDislikeByIdProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<FetchDislikeByIdQuery, FetchDislikeByIdQueryVariables>
    } & TChildProps;
export function withFetchDislikeById<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  FetchDislikeByIdQuery,
  FetchDislikeByIdQueryVariables,
  FetchDislikeByIdProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, FetchDislikeByIdQuery, FetchDislikeByIdQueryVariables, FetchDislikeByIdProps<TChildProps, TDataName>>(FetchDislikeByIdDocument, {
      alias: 'fetchDislikeById',
      ...operationOptions
    });
};

/**
 * __useFetchDislikeByIdQuery__
 *
 * To run a query within a React component, call `useFetchDislikeByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchDislikeByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchDislikeByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFetchDislikeByIdQuery(baseOptions?: Apollo.QueryHookOptions<FetchDislikeByIdQuery, FetchDislikeByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchDislikeByIdQuery, FetchDislikeByIdQueryVariables>(FetchDislikeByIdDocument, options);
      }
export function useFetchDislikeByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchDislikeByIdQuery, FetchDislikeByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchDislikeByIdQuery, FetchDislikeByIdQueryVariables>(FetchDislikeByIdDocument, options);
        }
export function useFetchDislikeByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FetchDislikeByIdQuery, FetchDislikeByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FetchDislikeByIdQuery, FetchDislikeByIdQueryVariables>(FetchDislikeByIdDocument, options);
        }
export type FetchDislikeByIdQueryHookResult = ReturnType<typeof useFetchDislikeByIdQuery>;
export type FetchDislikeByIdLazyQueryHookResult = ReturnType<typeof useFetchDislikeByIdLazyQuery>;
export type FetchDislikeByIdSuspenseQueryHookResult = ReturnType<typeof useFetchDislikeByIdSuspenseQuery>;
export type FetchDislikeByIdQueryResult = Apollo.QueryResult<FetchDislikeByIdQuery, FetchDislikeByIdQueryVariables>;
export const FetchFavoriteByIdDocument = gql`
    query fetchFavoriteById($id: String) {
  favorites(userId: $id) {
    id
    item {
      id
      name
      image
      createdAt
      updatedAt
      ingredients {
        id
        name
      }
    }
    user {
      id
    }
    createdAt
    updatedAt
  }
}
    `;
export type FetchFavoriteByIdProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<FetchFavoriteByIdQuery, FetchFavoriteByIdQueryVariables>
    } & TChildProps;
export function withFetchFavoriteById<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  FetchFavoriteByIdQuery,
  FetchFavoriteByIdQueryVariables,
  FetchFavoriteByIdProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, FetchFavoriteByIdQuery, FetchFavoriteByIdQueryVariables, FetchFavoriteByIdProps<TChildProps, TDataName>>(FetchFavoriteByIdDocument, {
      alias: 'fetchFavoriteById',
      ...operationOptions
    });
};

/**
 * __useFetchFavoriteByIdQuery__
 *
 * To run a query within a React component, call `useFetchFavoriteByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchFavoriteByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchFavoriteByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFetchFavoriteByIdQuery(baseOptions?: Apollo.QueryHookOptions<FetchFavoriteByIdQuery, FetchFavoriteByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchFavoriteByIdQuery, FetchFavoriteByIdQueryVariables>(FetchFavoriteByIdDocument, options);
      }
export function useFetchFavoriteByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchFavoriteByIdQuery, FetchFavoriteByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchFavoriteByIdQuery, FetchFavoriteByIdQueryVariables>(FetchFavoriteByIdDocument, options);
        }
export function useFetchFavoriteByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FetchFavoriteByIdQuery, FetchFavoriteByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FetchFavoriteByIdQuery, FetchFavoriteByIdQueryVariables>(FetchFavoriteByIdDocument, options);
        }
export type FetchFavoriteByIdQueryHookResult = ReturnType<typeof useFetchFavoriteByIdQuery>;
export type FetchFavoriteByIdLazyQueryHookResult = ReturnType<typeof useFetchFavoriteByIdLazyQuery>;
export type FetchFavoriteByIdSuspenseQueryHookResult = ReturnType<typeof useFetchFavoriteByIdSuspenseQuery>;
export type FetchFavoriteByIdQueryResult = Apollo.QueryResult<FetchFavoriteByIdQuery, FetchFavoriteByIdQueryVariables>;
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
export const FetchItemsDocument = gql`
    query fetchItems {
  items {
    id
    name
    image
    ingredients {
      id
      name
    }
    createdAt
    updatedAt
  }
}
    `;
export type FetchItemsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<FetchItemsQuery, FetchItemsQueryVariables>
    } & TChildProps;
export function withFetchItems<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  FetchItemsQuery,
  FetchItemsQueryVariables,
  FetchItemsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, FetchItemsQuery, FetchItemsQueryVariables, FetchItemsProps<TChildProps, TDataName>>(FetchItemsDocument, {
      alias: 'fetchItems',
      ...operationOptions
    });
};

/**
 * __useFetchItemsQuery__
 *
 * To run a query within a React component, call `useFetchItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchItemsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchItemsQuery(baseOptions?: Apollo.QueryHookOptions<FetchItemsQuery, FetchItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchItemsQuery, FetchItemsQueryVariables>(FetchItemsDocument, options);
      }
export function useFetchItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchItemsQuery, FetchItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchItemsQuery, FetchItemsQueryVariables>(FetchItemsDocument, options);
        }
export function useFetchItemsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FetchItemsQuery, FetchItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FetchItemsQuery, FetchItemsQueryVariables>(FetchItemsDocument, options);
        }
export type FetchItemsQueryHookResult = ReturnType<typeof useFetchItemsQuery>;
export type FetchItemsLazyQueryHookResult = ReturnType<typeof useFetchItemsLazyQuery>;
export type FetchItemsSuspenseQueryHookResult = ReturnType<typeof useFetchItemsSuspenseQuery>;
export type FetchItemsQueryResult = Apollo.QueryResult<FetchItemsQuery, FetchItemsQueryVariables>;
export const FetchOrderByIdDocument = gql`
    query fetchOrderById($userId: String!) {
  order(userId: $userId) {
    id
    createdAt
    updatedAt
    item {
      id
      name
      image
      createdAt
      updatedAt
    }
    user {
      id
      email
    }
  }
}
    `;
export type FetchOrderByIdProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<FetchOrderByIdQuery, FetchOrderByIdQueryVariables>
    } & TChildProps;
export function withFetchOrderById<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  FetchOrderByIdQuery,
  FetchOrderByIdQueryVariables,
  FetchOrderByIdProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, FetchOrderByIdQuery, FetchOrderByIdQueryVariables, FetchOrderByIdProps<TChildProps, TDataName>>(FetchOrderByIdDocument, {
      alias: 'fetchOrderById',
      ...operationOptions
    });
};

/**
 * __useFetchOrderByIdQuery__
 *
 * To run a query within a React component, call `useFetchOrderByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchOrderByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchOrderByIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFetchOrderByIdQuery(baseOptions: Apollo.QueryHookOptions<FetchOrderByIdQuery, FetchOrderByIdQueryVariables> & ({ variables: FetchOrderByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchOrderByIdQuery, FetchOrderByIdQueryVariables>(FetchOrderByIdDocument, options);
      }
export function useFetchOrderByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchOrderByIdQuery, FetchOrderByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchOrderByIdQuery, FetchOrderByIdQueryVariables>(FetchOrderByIdDocument, options);
        }
export function useFetchOrderByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FetchOrderByIdQuery, FetchOrderByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FetchOrderByIdQuery, FetchOrderByIdQueryVariables>(FetchOrderByIdDocument, options);
        }
export type FetchOrderByIdQueryHookResult = ReturnType<typeof useFetchOrderByIdQuery>;
export type FetchOrderByIdLazyQueryHookResult = ReturnType<typeof useFetchOrderByIdLazyQuery>;
export type FetchOrderByIdSuspenseQueryHookResult = ReturnType<typeof useFetchOrderByIdSuspenseQuery>;
export type FetchOrderByIdQueryResult = Apollo.QueryResult<FetchOrderByIdQuery, FetchOrderByIdQueryVariables>;
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
    }
    user {
      id
    }
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