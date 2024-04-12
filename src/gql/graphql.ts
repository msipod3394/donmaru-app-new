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
  email: Scalars['String']['input'];
  ingredientIds: Array<Scalars['String']['input']>;
};


export type MutationCreateFavoriteArgs = {
  itemId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationCreateFavoritesArgs = {
  email: Scalars['String']['input'];
  itemIds: Array<Scalars['String']['input']>;
};


export type MutationCreateOrderArgs = {
  email: Scalars['String']['input'];
  itemId: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationDeleteDislikesArgs = {
  email: Scalars['String']['input'];
  ingredientIds: Array<Scalars['String']['input']>;
};


export type MutationDeleteFavoritesArgs = {
  email: Scalars['String']['input'];
  itemIds: Array<Scalars['String']['input']>;
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
  getUser?: Maybe<User>;
  ingredients: Array<Ingredient>;
  items: Array<Item>;
  /** emailを指定して検索、emailの指定がなければ全件取得 */
  order: Array<Order>;
};


export type QueryDislikesArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFavoritesArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
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
  email?: InputMaybe<Scalars['String']['input']>;
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

export type AddFavoritesMutationVariables = Exact<{
  itemIds: Array<Scalars['String']['input']> | Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type AddFavoritesMutation = { __typename?: 'Mutation', createFavorites: Array<{ __typename?: 'Favorite', id: string, createdAt: any, updatedAt: any, item: { __typename?: 'Item', id: string, name: string }, user: { __typename?: 'User', id: string, email: string } }> };

export type DeleteFavoritesMutationVariables = Exact<{
  itemIds: Array<Scalars['String']['input']> | Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type DeleteFavoritesMutation = { __typename?: 'Mutation', deleteFavorites: boolean };

export type FetchDislikeByEmailQueryVariables = Exact<{
  email?: InputMaybe<Scalars['String']['input']>;
}>;


export type FetchDislikeByEmailQuery = { __typename?: 'Query', dislikes: Array<{ __typename?: 'Dislike', ingredient: { __typename?: 'Ingredient', id: string } }> };

export type FetchFavoriteByEmailQueryVariables = Exact<{
  email?: InputMaybe<Scalars['String']['input']>;
}>;


export type FetchFavoriteByEmailQuery = { __typename?: 'Query', favorites: Array<{ __typename?: 'Favorite', id: string, updatedAt: any, item: { __typename?: 'Item', id: string, name: string, image: string, updatedAt: any, ingredients: Array<{ __typename?: 'IngredientItem', name: string }> } }> };

export type FetchIngredientsQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchIngredientsQuery = { __typename?: 'Query', ingredients: Array<{ __typename?: 'Ingredient', id: string, name: string }> };

export type FetchItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchItemsQuery = { __typename?: 'Query', items: Array<{ __typename?: 'Item', id: string, name: string, image: string, updatedAt: any, ingredients: Array<{ __typename?: 'IngredientItem', id: string, name: string }> }> };

export type FetchOrderByEmailQueryVariables = Exact<{
  email?: InputMaybe<Scalars['String']['input']>;
}>;


export type FetchOrderByEmailQuery = { __typename?: 'Query', order: Array<{ __typename?: 'Order', id: string, item: { __typename?: 'Item', id: string, name: string, image: string, updatedAt: any } }> };

export type GetItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetItemsQuery = { __typename?: 'Query', items: Array<{ __typename?: 'Item', id: string, name: string, image: string, updatedAt: any, ingredients: Array<{ __typename?: 'IngredientItem', id: string, name: string }> }> };

export type AddDislikesMutationVariables = Exact<{
  ingredientIds: Array<Scalars['String']['input']> | Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type AddDislikesMutation = { __typename?: 'Mutation', createDislikes: Array<{ __typename?: 'Dislike', id: string, createdAt: any, updatedAt: any, ingredient: { __typename?: 'Ingredient', id: string }, user: { __typename?: 'User', id: string } }> };

export type DeleteDislikeMutationVariables = Exact<{
  ingredientIds: Array<Scalars['String']['input']> | Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type DeleteDislikeMutation = { __typename?: 'Mutation', deleteDislikes: boolean };

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
  email: Scalars['String']['input'];
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder: { __typename?: 'Order', id: string, item: { __typename?: 'Item', id: string }, user: { __typename?: 'User', id: string } } };

export type FetchGetUserQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type FetchGetUserQuery = { __typename?: 'Query', getUser?: { __typename?: 'User', id: string, userName: string, email: string } | null };


export const AddFavoritesDocument = gql`
    mutation addFavorites($itemIds: [String!]!, $email: String!) {
  createFavorites(itemIds: $itemIds, email: $email) {
    id
    item {
      id
      name
    }
    user {
      id
      email
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
 *      email: // value for 'email'
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
    mutation deleteFavorites($itemIds: [String!]!, $email: String!) {
  deleteFavorites(itemIds: $itemIds, email: $email)
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
 *      email: // value for 'email'
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
export const FetchFavoriteByEmailDocument = gql`
    query fetchFavoriteByEmail($email: String) {
  favorites(email: $email) {
    id
    item {
      id
      name
      image
      updatedAt
      ingredients {
        name
      }
    }
    updatedAt
  }
}
    `;
export type FetchFavoriteByEmailProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<FetchFavoriteByEmailQuery, FetchFavoriteByEmailQueryVariables>
    } & TChildProps;
export function withFetchFavoriteByEmail<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  FetchFavoriteByEmailQuery,
  FetchFavoriteByEmailQueryVariables,
  FetchFavoriteByEmailProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, FetchFavoriteByEmailQuery, FetchFavoriteByEmailQueryVariables, FetchFavoriteByEmailProps<TChildProps, TDataName>>(FetchFavoriteByEmailDocument, {
      alias: 'fetchFavoriteByEmail',
      ...operationOptions
    });
};

/**
 * __useFetchFavoriteByEmailQuery__
 *
 * To run a query within a React component, call `useFetchFavoriteByEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchFavoriteByEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchFavoriteByEmailQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useFetchFavoriteByEmailQuery(baseOptions?: Apollo.QueryHookOptions<FetchFavoriteByEmailQuery, FetchFavoriteByEmailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchFavoriteByEmailQuery, FetchFavoriteByEmailQueryVariables>(FetchFavoriteByEmailDocument, options);
      }
export function useFetchFavoriteByEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchFavoriteByEmailQuery, FetchFavoriteByEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchFavoriteByEmailQuery, FetchFavoriteByEmailQueryVariables>(FetchFavoriteByEmailDocument, options);
        }
export function useFetchFavoriteByEmailSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FetchFavoriteByEmailQuery, FetchFavoriteByEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FetchFavoriteByEmailQuery, FetchFavoriteByEmailQueryVariables>(FetchFavoriteByEmailDocument, options);
        }
export type FetchFavoriteByEmailQueryHookResult = ReturnType<typeof useFetchFavoriteByEmailQuery>;
export type FetchFavoriteByEmailLazyQueryHookResult = ReturnType<typeof useFetchFavoriteByEmailLazyQuery>;
export type FetchFavoriteByEmailSuspenseQueryHookResult = ReturnType<typeof useFetchFavoriteByEmailSuspenseQuery>;
export type FetchFavoriteByEmailQueryResult = Apollo.QueryResult<FetchFavoriteByEmailQuery, FetchFavoriteByEmailQueryVariables>;
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
export const FetchOrderByEmailDocument = gql`
    query fetchOrderByEmail($email: String) {
  order(email: $email) {
    id
    item {
      id
      name
      image
      updatedAt
    }
  }
}
    `;
export type FetchOrderByEmailProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<FetchOrderByEmailQuery, FetchOrderByEmailQueryVariables>
    } & TChildProps;
export function withFetchOrderByEmail<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  FetchOrderByEmailQuery,
  FetchOrderByEmailQueryVariables,
  FetchOrderByEmailProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, FetchOrderByEmailQuery, FetchOrderByEmailQueryVariables, FetchOrderByEmailProps<TChildProps, TDataName>>(FetchOrderByEmailDocument, {
      alias: 'fetchOrderByEmail',
      ...operationOptions
    });
};

/**
 * __useFetchOrderByEmailQuery__
 *
 * To run a query within a React component, call `useFetchOrderByEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchOrderByEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchOrderByEmailQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useFetchOrderByEmailQuery(baseOptions?: Apollo.QueryHookOptions<FetchOrderByEmailQuery, FetchOrderByEmailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchOrderByEmailQuery, FetchOrderByEmailQueryVariables>(FetchOrderByEmailDocument, options);
      }
export function useFetchOrderByEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchOrderByEmailQuery, FetchOrderByEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchOrderByEmailQuery, FetchOrderByEmailQueryVariables>(FetchOrderByEmailDocument, options);
        }
export function useFetchOrderByEmailSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FetchOrderByEmailQuery, FetchOrderByEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FetchOrderByEmailQuery, FetchOrderByEmailQueryVariables>(FetchOrderByEmailDocument, options);
        }
export type FetchOrderByEmailQueryHookResult = ReturnType<typeof useFetchOrderByEmailQuery>;
export type FetchOrderByEmailLazyQueryHookResult = ReturnType<typeof useFetchOrderByEmailLazyQuery>;
export type FetchOrderByEmailSuspenseQueryHookResult = ReturnType<typeof useFetchOrderByEmailSuspenseQuery>;
export type FetchOrderByEmailQueryResult = Apollo.QueryResult<FetchOrderByEmailQuery, FetchOrderByEmailQueryVariables>;
export const GetItemsDocument = gql`
    query GetItems {
  items {
    id
    name
    image
    updatedAt
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
export const AddDislikesDocument = gql`
    mutation addDislikes($ingredientIds: [String!]!, $email: String!) {
  createDislikes(ingredientIds: $ingredientIds, email: $email) {
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
 *      email: // value for 'email'
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
    mutation deleteDislike($ingredientIds: [String!]!, $email: String!) {
  deleteDislikes(ingredientIds: $ingredientIds, email: $email)
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
 *      email: // value for 'email'
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
    mutation CreateOrder($itemId: String!, $email: String!) {
  createOrder(itemId: $itemId, email: $email) {
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
 *      email: // value for 'email'
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
export const FetchGetUserDocument = gql`
    query fetchGetUser($email: String!) {
  getUser(email: $email) {
    id
    userName
    email
  }
}
    `;
export type FetchGetUserProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<FetchGetUserQuery, FetchGetUserQueryVariables>
    } & TChildProps;
export function withFetchGetUser<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  FetchGetUserQuery,
  FetchGetUserQueryVariables,
  FetchGetUserProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, FetchGetUserQuery, FetchGetUserQueryVariables, FetchGetUserProps<TChildProps, TDataName>>(FetchGetUserDocument, {
      alias: 'fetchGetUser',
      ...operationOptions
    });
};

/**
 * __useFetchGetUserQuery__
 *
 * To run a query within a React component, call `useFetchGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchGetUserQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useFetchGetUserQuery(baseOptions: Apollo.QueryHookOptions<FetchGetUserQuery, FetchGetUserQueryVariables> & ({ variables: FetchGetUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchGetUserQuery, FetchGetUserQueryVariables>(FetchGetUserDocument, options);
      }
export function useFetchGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchGetUserQuery, FetchGetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchGetUserQuery, FetchGetUserQueryVariables>(FetchGetUserDocument, options);
        }
export function useFetchGetUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FetchGetUserQuery, FetchGetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FetchGetUserQuery, FetchGetUserQueryVariables>(FetchGetUserDocument, options);
        }
export type FetchGetUserQueryHookResult = ReturnType<typeof useFetchGetUserQuery>;
export type FetchGetUserLazyQueryHookResult = ReturnType<typeof useFetchGetUserLazyQuery>;
export type FetchGetUserSuspenseQueryHookResult = ReturnType<typeof useFetchGetUserSuspenseQuery>;
export type FetchGetUserQueryResult = Apollo.QueryResult<FetchGetUserQuery, FetchGetUserQueryVariables>;