import { AddFavoritesMutation, DeleteFavoritesMutation, Exact } from '@/gql/graphql'
import {
  ApolloCache,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
} from '@apollo/client'

export async function handleUpdate(
  user: { id: string },
  addIds: string[] | undefined,
  deleteIds: string[] | undefined,

  addFavoritesMutation: (
    options?:
      | MutationFunctionOptions<
          AddFavoritesMutation,
          Exact<{ itemIds: string | string[]; userId: string }>,
          DefaultContext,
          ApolloCache<any>
        >
      | undefined,
  ) => Promise<FetchResult<AddFavoritesMutation>>,
  deleteFavoritesMutation: (
    options?:
      | MutationFunctionOptions<
          DeleteFavoritesMutation,
          Exact<{ itemIds: string | string[]; userId: string }>,
          DefaultContext,
          ApolloCache<any>
        >
      | undefined,
  ) => Promise<FetchResult<DeleteFavoritesMutation>>,
): Promise<boolean> {
  const userId = user.id.toString()

  try {
    await Promise.all([
      addFavoritesMutation({ variables: { itemIds: addIds, userId: userId } }),
      deleteFavoritesMutation({ variables: { itemIds: deleteIds, userId: userId } }),
    ])

    return true
  } catch (error) {
    console.error('エラー:', error)
    return false
  }
}
